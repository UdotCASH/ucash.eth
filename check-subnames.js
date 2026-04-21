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

    // List of common subnames to check
    const subnames = [
        'www',
        'app',
        'api',
        'docs',
        'blog',
        'contracts',
        'batch',
        'bridge',
        'pay',
        'staking',
        'stake',
        'faucet',
        'scan',
        'swap',
        'dex',
        'eth',
        'base',
        'polygon',
        'arbitrum',
        'optimism',
        'sepolia',
        'testnet',
        'mainnet',
        'treasury',
        'ops',
        'operations',
        'dev',
        'development',
        'marketing',
        'mkt',
        'community',
        'multisig',
        'dao',
        'governance',
        'token',
        'nft',
        'wallet',
        'explorer',
        'chat',
        'forum',
        'status',
        'metrics',
        'analytics',
        'portal',
        'exchange',
        'protocol',
        'network',
        'node',
        'validator',
        'relayer',
        'aggregator',
        'router',
        'factory',
        'registry',
        'oracle',
        'bridge-base',
        'bridge-polygon',
        'bridge-arbitrum',
        'v1',
        'v2',
        'beta',
        'alpha',
        'test',
        'staging',
        'old',
        'new',
        'airdrop',
        'claim',
        'rewards',
        'yield',
        'farm',
        'vault',
        'insurance',
        'governor',
        'timelock',
        'signer',
        'keeper',
        'bot',
        'admin',
        'root',
        'legacy'
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
