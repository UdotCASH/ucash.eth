const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');

// ENS Registry address
const ENS_REGISTRY = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';

// ENS Registry ABI (only what we need)
const registryABI = [
    'function owner(bytes32 node) view returns (address)',
    'function resolver(bytes32 node) view returns (address)'
];

async function checkSubnames() {
    console.log('Querying ucash.eth subnames...\n');

    const registry = new ethers.Contract(ENS_REGISTRY, registryABI, provider);
    
    // Get the namehash of ucash.eth
    const ucashNode = ethers.namehash('ucash.eth');
    console.log('ucash.eth nodehash:', ucashNode);
    console.log('');

    // List of common subnames to check (100+ documented subdomains)
    const subnames = [
        // Core Infrastructure
        'www', 'app', 'api', 'docs', 'info', 'admin', 'dev', 'test', 'testnet', 'pay',

        // Smart Contracts & Protocol
        'batch', 'contracts', 'token', 'bridge', 'earn', 'vault', 'claim', 'lock',
        'gov', 'dao', 'vote', 'oracle', 'agent', 'bot', 'sign', 'supply',

        // Bounty Offering Wallets
        'initial', 'ongoing', 'build', 'partners', 'future', 'liquidity',

        // Blockchain Networks
        'polygon', 'base', 'arb', 'linea', 'op', 'sol', 'bnb', 'btc', 'xrp', 'ltc', 'xmr',

        // Cross-Chain
        'network', 'bridge', 'swap', 'exchange',

        // Explorers & Tools
        'scan', 'verify', 'link', 'mgr', 'nic', 'support', 'bounties', 'news',
        'channel', 'cash', 'builders',

        // Decentralized Storage
        'ipfs', 'arweave', 'swarm', 'onion', 'skynet',

        // Naming & Domain Services
        'dns', 'ens', 'domains', 'names', 'uns', 'linked',

        // Geographic TLDs (ccTLDs)
        'ad', 'ar', 'at', 'br', 'ca', 'cc', 'cn', 'co', 'cv', 'de', 'es', 'fm',
        'fr', 'id', 'in', 'io', 'it', 'jp', 'kr', 'la', 'li', 'ly', 'me', 'mx',
        'mw', 'my', 'ng', 'nl', 'ru', 'rw', 'to', 'tv', 'uk', 'us', 'vn', 'ws',

        // Generic TLDs (gTLDs)
        'tld', 'club', 'pro', 'biz', 'name', 'vip', 'top', 'tech', 'online',
        'ooo', 'gdn', 'xyz', 'u', 'net', 'org', 'onl', 'com', 'wiki', 'technology',
        'productions',

        // Brand & Identity
        'brand', 'builders', 'technology', 'productions', 'channel',

        // Security
        'security', 'verify',

        // Legacy/Common (from original list)
        'blog', 'staking', 'stake', 'faucet', 'dex', 'eth', 'arbitrum', 'optimism',
        'sepolia', 'mainnet', 'treasury', 'ops', 'operations', 'development', 'marketing',
        'mkt', 'community', 'multisig', 'governance', 'nft', 'wallet', 'explorer',
        'chat', 'forum', 'status', 'metrics', 'analytics', 'portal', 'protocol', 'node',
        'validator', 'relayer', 'aggregator', 'router', 'factory', 'registry',
        'bridge-base', 'bridge-polygon', 'bridge-arbitrum', 'v1', 'v2', 'beta', 'alpha',
        'staging', 'old', 'new', 'airdrop', 'rewards', 'yield', 'farm', 'insurance',
        'governor', 'timelock', 'signer', 'keeper', 'admin', 'root', 'legacy'
    ];

    const found = [];

    for (const subname of subnames) {
        const fullName = `${subname}.ucash.eth`;
        
        try {
            const node = ethers.namehash(fullName);
            const owner = await registry.owner(node);
            
            // If owner is not zero address, subname exists
            if (owner !== ethers.ZeroAddress && owner !== '0x0000000000000000000000000000000000000000') {
                const resolver = await registry.resolver(node);
                found.push({
                    subname: fullName,
                    owner: owner,
                    resolver: resolver,
                    hasResolver: resolver !== ethers.ZeroAddress && resolver !== '0x0000000000000000000000000000000000000000'
                });
                
                console.log(`✅ ${fullName}`);
                console.log(`   Owner: ${owner}`);
                console.log(`   Resolver: ${resolver}`);
                console.log('');
            }
        } catch (error) {
            // Subname doesn't exist or other error
        }
    }

    console.log(`\nFound ${found.length} active subnames`);

    // Also check the main ucash.eth info
    console.log('\n=== Main ucash.eth Info ===');
    const ucashOwner = await registry.owner(ucashNode);
    const ucashResolver = await registry.resolver(ucashNode);
    
    console.log(`Owner: ${ucashOwner}`);
    console.log(`Resolver: ${ucashResolver}`);

    // If there's a resolver, try to get the address
    if (ucashResolver !== ethers.ZeroAddress) {
        try {
            const resolverABI = ['function addr(bytes32 node) view returns (address)'];
            const resolverContract = new ethers.Contract(ucashResolver, resolverABI, provider);
            const address = await resolverContract.addr(ucashNode);
            console.log(`Address: ${address}`);
        } catch (error) {
            console.log('Could not resolve address');
        }
    }

    return found;
}

checkSubnames().catch(console.error);
