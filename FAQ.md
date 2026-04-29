# ❓ Frequently Asked Questions - ucash.eth {#faq-top}

**Last Updated**: 2026-04-28

---

## Table of Contents

- [General Questions](#general-questions)
- [ENS & Subdomains](#ens--subdomains)
- [Multi-Chain](#multi-chain)
- [Security & Verification](#security--verification)
- [Integration & Development](#integration--development)
- [Troubleshooting](#troubleshooting)
- [Still Have Questions?](#still-have-questions)

---

## General Questions

### Q: What is ucash.eth?

**A:** `ucash.eth` is the official ENS (Ethereum Name Service) identity for UCASH, providing:
- Human-readable names instead of 0x addresses
- 300+ subdomains for decentralized services
- Multi-chain presence across 15+ networks
- Cryptographically verifiable on-chain records
- Simplified payments to `ucash.eth` instead of addresses

### Q: What is UCASH?

**A:** UCASH is a network loyalty, rewards, and utility asset that has been building Web3 infrastructure since 2015. Key stats:
- **650,000+ users** onboarded globally
- **300,000+ on-chain holders** across multiple networks
- **1,200+ active sites** across various industries
- **20+ apps, dApps and services** live and deployed
- **4,000,000+ platform interactions** across all services
- **2,500,000+ bounty engagements** through IBO and OBO programs
- **10+ years** active (2015-2026)

### Q: How many subdomains does ucash.eth have?

**A:** **300+ subdomains** currently in development (as of 2026-04-28). All subdomains are manager-controlled and verified. See [SUBDOMAINS.md](SUBDOMAINS.md) for the complete list.

### Q: What is the current status of UCASH subdomains?

**A:** All 300+ subdomains are currently 🟡 **In Development**. This means they are registered and configured but not yet fully deployed. Check [app.ens.domains/ucash.eth](https://app.ens.domains/ucash.eth?tab=subnames) for the latest status.

### Q: How long has UCASH been active?

**A:** UCASH has been active since **October 2015** (10+ years). The ecosystem has evolved through multiple phases:
- 2015-2017: Initial infrastructure (U.CASH site, portal, converters)
- 2017-2019: Token launch and core products (IBO, uWithdraw, uExchange)
- 2019-2021: Multi-chain expansion and global launch
- 2021-2023: Ecosystem growth (payments, DNS, AI)
- 2024-2026: Web3 naming and domains (ENS, .U, @U, ucash.eth)

See the full timeline in [README.md](README.md#ecosystem-timeline).

---

## ENS & Subdomains

### Q: How do I verify a ucash.eth subdomain?

**A:** There are three ways to verify a subdomain:

**Method 1: Check This Repository**
- All official subdomains are listed in [SUBDOMAINS.md](SUBDOMAINS.md)
- Cross-reference with [README.md](README.md)

**Method 2: ENS Lookup**
```bash
# Using nslookup
nslookup app.ucash.eth

# Or using dig
dig app.ucash.eth

# Or using ethers.js
const address = await provider.resolveName('app.ucash.eth');
```

**Method 3: ENS Manager**
```
Visit: https://app.ens.domains/name/app.ucash.eth
```

⚠️ **Warning**: Only subdomains listed in this repository are official UCASH subdomains.

### Q: What is ucash.onl?

**A:** `ucash.onl` is a **wildcard IPFS gateway resolution service** for the UCASH ENS ecosystem. It maps `*.ucash.eth` subnames to `*.ucash.onl` URLs for easier browser access.

**Examples:**
- `www.ucash.eth` → `https://www.ucash.onl`
- `docs.ucash.eth` → `https://docs.ucash.onl`
- `app.ucash.eth` → `https://app.ucash.onl`

**Benefits:**
- ✅ Works in all browsers without Web3 extensions
- ✅ Faster resolution (direct gateway access)
- ✅ Easy to share with non-crypto users
- ✅ CDN integration for optimized delivery

### Q: Can I register a ucash.eth subdomain?

**A:** No, ucash.eth subdomains are **not available for public registration**. All 300+ subdomains are manager-controlled and owned by the ucash.eth owner for official UCASH services.

**Public alternatives:**
- Register a `.U` domain: [get.unstoppabledomains.com/u/](https://get.unstoppabledomains.com/u/) (22,000+ claimed)
- Register a `@U` handle: [fio.net](https://fio.net) (coming soon)

### Q: How do I send tokens to ucash.eth?

**A:** Sending to `ucash.eth` is easy with any ENS-compatible wallet:

**Using MetaMask:**
1. Open MetaMask
2. Click "Send"
3. Enter `ucash.eth` in the recipient field
4. MetaMask auto-resolves to the correct address
5. Enter amount and confirm

**Using Coinbase Wallet:**
1. Open Coinbase Wallet
2. Tap "Send"
3. Enter `ucash.eth`
4. Wallet resolves automatically
5. Confirm transaction

**Using ethers.js:**
```javascript
await token.transfer('ucash.eth', amount);
```

**Always verify** the resolved address matches: `0x1CE1E8d2dc83A3051adA2974D9A6c0AD1E5F4E0F`

### Q: What are the text records for ucash.eth?

**A:** ucash.eth has **55+ text records** configured, including:
- `email`: info@u.cash
- `url`: https://u.cash
- `com.twitter`: UdotCASH
- `com.github`: UdotCASH
- `org.telegram`: ucash
- `description`: Full project description
- `avatar`: https://euc.li/ucash.eth
- Social media links (YouTube, Instagram, Facebook, Reddit, LinkedIn)
- Explorers (Etherscan, Polygonscan, Basescan)
- Multi-chain names (Base, Linea, Arbitrum, BNB, Solana, etc.)

View all records in [README.md](README.md#text-records) or on [app.ens.domains](https://app.ens.domains/ucash.eth).

---

## Multi-Chain

### Q: What multi-chain names does UCASH have?

**A:** UCASH has **15+ blockchain names** across multiple networks:

**Primary Names:**
- `ucash.eth` - Ethereum Name Service (300+ subdomains)
- `ucash.base.eth` - Base Names
- `ucash.linea.eth` - Linea Names
- `ucash.arb` - SpaceID (Arbitrum)
- `ucash.bnb` - SpaceID (BNB Chain)
- `ucash.g` - SpaceID (Gravity Alpha)
- `ucash.sol` - Solana Name Service
- `ucash.polygon` - Unstoppable Domains
- `ucash.u` - Ucosystem TLD (.U domain)
- `ucash.op` - Optimism Domains
- `ucash.btc` - Bitcoin Name Service
- `ucash.xrp` - XRP Name Service
- `ucash.ltc` - LTC Names
- `ucash.xmr` - XMR Names

**Additional Names:**
- `ucash.dao.eth` - Aragon DAO
- `sui@ucash` - Sui Name Service
- `ada@ucash` - Cardano Handle
- `lens@ucash` - Lens Protocol
- `fio@ucash` - FIO Protocol
- `ucash.ton` - TON Name Service
- `ucash.tao` - Bittensor Name Service
- `ucash.xns` - X Name Service

See [NETWORKS.md](NETWORKS.md) for complete details.

### Q: What networks are supported?

**A:** UCASH supports **15+ networks**:

**EVM Chains:**
- Ethereum (Mainnet)
- Base
- Arbitrum
- Optimism
- Linea
- BNB Chain
- Polygon

**Non-EVM Chains:**
- Solana
- Bitcoin
- XRP Ledger
- Litecoin
- Monero
- Cardano
- Sui
- TON
- Bittensor (TAO)
- Bitcoin Cash (BCH)
- Gravity Alpha

See [NETWORKS.md](NETWORKS.md) for network-specific details.

### Q: How do I resolve ucash.eth on different networks?

**A:** Resolution methods vary by network:

**ENS (Ethereum):**
```javascript
const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
const address = await provider.resolveName('ucash.eth');
```

**Base Names:**
```javascript
const baseProvider = new ethers.JsonRpcProvider('https://mainnet.base.org');
const ucashBase = await baseProvider.resolveName('ucash.base.eth');
```

**Solana Name Service:**
```javascript
import { getSolanaName } from '@solana/sns';
const ucashSol = await getSolanaName('ucash.sol');
```

**Unstoppable Domains:**
```javascript
const ucashUD = await resolve('ucash.u');
```

See [INTEGRATION.md](INTEGRATION.md) for more examples.

### Q: What is the .U TLD?

**A:** `.U` is a **public TLD** operated by UCASH on Unstoppable Domains. Anyone can register their own `.U` domain.

**Stats:**
- 🔐 **22,000+ .U domains claimed**
- 💰 **One-time fee** (no renewals)
- 🔗 **Multi-chain address** support
- 🌐 **Decentralized website** hosting

**Register at:** [get.unstoppabledomains.com/u/](https://get.unstoppabledomains.com/u/)

**Examples:**
- `ucash.u` - Official UCASH .U domain
- `yourname.u` - Your personal .U domain
- `*.u` - Any .U domain

**Benefits:**
- Replace wallet addresses with `yourname.u`
- Host decentralized websites
- Receive crypto payments
- No renewal fees (own forever)

### Q: What is the @U handle?

**A:** `@U` is a **public handle TLD** operated by UCASH on FIO Protocol. It allows anyone to register their own `@U` handle.

**Status:** Public registration opening soon

**Register at:** [fio.net](https://fio.net)

**Benefits:**
- 📱 Cross-chain payments
- 🔄 Interoperable with major wallets
- 🛡️ Secure by design (transaction mapping + memo support)

**Example:** `ucash@u`

---

## Security & Verification

### Q: How do I know if a ucash.eth subdomain is official?

**A:** Follow these verification steps:

1. **Check this repository** - All official subdomains are listed in [SUBDOMAINS.md](SUBDOMAINS.md)
2. **Verify on ENS app** - Check [app.ens.domains/ucash.eth?tab=subnames](https://app.ens.domains/ucash.eth?tab=subnames)
3. **Cross-reference with [ADDRESSES.md](ADDRESSES.md)** - Verify contract addresses
4. **Confirm in official channels** - Verify via t.me/ucash

⚠️ **Never trust** subdomains from:
- Unsolicited DMs
- Unverified social media
- Fake websites (ucash.eth.com, ucash.io, etc.)
- Unknown sources

### Q: What are common scams to watch out for?

**A:** 🚩 **Common Scams:**

**Fake Websites:**
- `ucash.eth.com`
- `ucash.io`
- `ucash-token.com`
- Any variation not ending in `.eth`

**Impersonation:**
- Fake Discord/Telegram accounts
- Fake social media profiles
- Impersonators claiming to be UCASH team

**Fake Airdrops:**
- "Claim your UCASH tokens now!"
- "Verify your wallet to receive rewards"
- "Send 1 ETH, get 2 ETH back"

**Investment Scams:**
- Promises of unrealistic returns
- "Guaranteed profits"
- Urgency tactics ("act now!")

**How to Protect Yourself:**
1. **Only trust ucash.eth** (the official ENS)
2. **Bookmark official sites** from this repository
3. **Never share private keys**
4. **Enable 2FA on all accounts**
5. **Use hardware wallets** for large amounts
6. **Verify every transaction** before signing
7. **Start with test transactions** (small amounts)

### Q: How do I report a security issue?

**A:** If you discover a security vulnerability:

**DO:**
- ✅ Report privately to security@u.cash
- ✅ Include detailed description and proof of concept
- ✅ Allow reasonable time to fix before public disclosure
- ✅ Provide contact information for follow-up

**DON'T:**
- ❌ Publicly disclose before fix is deployed
- ❌ Exploit the vulnerability
- ❌ Demand excessive bounty payments
- ❌ Use the vulnerability to harm users

**Bug Bounty Program:**
- **Critical**: $5,000 - $50,000
- **High**: $1,000 - $5,000
- **Medium**: $500 - $1,000
- **Low**: $100 - $500

**Submit:** security@u.cash with PGP key if available

### Q: What should I do if I've been scammed?

**A:** **Immediate Actions:**

1. **Stop** - Don't send more tokens
2. **Document** - Save all transaction hashes, messages, screenshots
3. **Report** - Email abuse@u.cash with details
4. **Contact** - Reach out to relevant exchange (if applicable)
5. **Secure** - Change passwords, transfer remaining funds to new wallet

**Recovery Options:**
- Contact your wallet provider
- Report to relevant authorities
- Join community support channels for guidance

**Report Scams:**
- **Email**: abuse@u.cash
- **Telegram**: t.me/ucash
- **Security**: security@u.cash

### Q: How do I verify a UCASH contract address?

**A:** Follow these steps:

1. **Check this repository** - All addresses are in [ADDRESSES.md](ADDRESSES.md)
2. **Verify on Etherscan** - Check for "Contract Source Code Verified" badge
3. **Cross-reference** - Confirm address matches official announcements
4. **Test transaction** - Send small amount first

**Contract Verification Checklist:**
- [ ] Source code verified on Etherscan
- [ ] Contract address matches this repository
- [ ] ENS record points to correct address
- [ ] ABI is available for integration
- [ ] Audit report is available (if applicable)
- [ ] Official announcement exists

**UCASH Token Contracts:**
- **Ethereum**: `0x92e52a1a235d9a103d970901066ce910aacefd37`
- **Polygon**: `0xa94880d3a4b39746e90cdb57f8de3732c984de14`
- **Base**: `0x26cf750abaf38af7109effdbdf79ba50d2ee09a1`

**Primary Address:**
- `0x1CE1E8d2dc83A3051adA2974D9A6c0AD1E5F4E0F` (ucash.eth)

---

## Integration & Development

### Q: How do I integrate ucash.eth into my application?

**A:** See [INTEGRATION.md](INTEGRATION.md) for comprehensive integration examples.

**Quick Start (JavaScript):**
```javascript
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');

// Resolve ENS to address
const address = await provider.resolveName('ucash.eth');
console.log(address); // 0x1CE1E8d2dc83A3051adA2974D9A6c0AD1E5F4E0F

// Reverse lookup
const reverseName = await provider.lookupAddress(address);
console.log(reverseName); // ucash.eth
```

**Frontend (React):**
```jsx
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

function UCASHAddress() {
    const [address, setAddress] = useState(null);

    useEffect(() => {
        async function resolveENS() {
            const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
            const resolvedAddress = await provider.resolveName('ucash.eth');
            setAddress(resolvedAddress);
        }
        resolveENS();
    }, []);

    return <div>{address}</div>;
}
```

### Q: What wallets support ucash.eth?

**A:** ucash.eth is supported by **all ENS-compatible wallets**:

**Desktop/Extension:**
- MetaMask
- Coinbase Wallet
- Brave Wallet
- Trust Wallet
- Rainbow
- Argent

**Mobile:**
- Coinbase Wallet
- Trust Wallet
- Rainbow
- Argent

**Hardware:**
- Ledger
- Trezor

**See [WALLETS.md](WALLETS.md)** for comprehensive wallet compatibility across all networks.

### Q: Can I use ucash.eth in smart contracts?

**A:** Yes! You can resolve ENS names in smart contracts:

**Solidity Example:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IENS {
    function resolver(bytes32 node) external view returns (address);
}

interface IResolver {
    function addr(bytes32 node) external view returns (address);
}

contract UCASHIntegration {
    IENS public constant ENS = IENS(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);
    bytes32 public constant UCASH_NODE = 0x...; // namehash('ucash.eth')

    function getUCASHAddress() public view returns (address) {
        IResolver resolver = IResolver(ENS.resolver(UCASH_NODE));
        return resolver.addr(UCASH_NODE);
    }

    function sendToUCASH(uint256 amount) external {
        address ucashAddress = getUCASHAddress();
        payable(ucashAddress).transfer(amount);
    }
}
```

**See [INTEGRATION.md](INTEGRATION.md)** for more examples.

### Q: How do I resolve subdomains programmatically?

**A:** Subdomains resolve the same way as the primary ENS:

```javascript
// Resolve subdomains
const app = await provider.resolveName('app.ucash.eth');
const api = await provider.resolveName('api.ucash.eth');
const batch = await provider.resolveName('batch.ucash.eth');

// Resolve network-specific
const polygon = await provider.resolveName('polygon.ucash.eth');
const base = await provider.resolveName('base.ucash.eth');

// All resolve to verified addresses
console.log(app);      // 0x...
console.log(api);      // 0x...
console.log(batch);    // 0x...
```

**See [SUBDOMAINS.md](SUBDOMAINS.md)** for the complete list of subdomains.

---

## Troubleshooting

### Q: Why isn't ucash.eth resolving in my wallet?

**A:** Common solutions:

**1. Check ENS Compatibility**
- Ensure your wallet supports ENS (MetaMask, Coinbase Wallet, etc.)
- Update to the latest wallet version

**2. Check Network**
- Ensure you're on Ethereum mainnet (not testnet)
- Try switching networks and back

**3. Clear Cache**
- Clear your wallet cache
- Restart the wallet application

**4. Use Etherscan**
- Verify the ENS exists: https://etherscan.io/ensLookup
- Check ucash.eth resolves correctly

**5. Alternative Method**
- Use the direct address: `0x1CE1E8d2dc83A3051adA2974D9A6c0AD1E5F4E0F`
- Verify on [app.ens.domains](https://app.ens.domains/ucash.eth)

**Still not working?**
- Contact support: info@u.cash
- Join Telegram: t.me/ucash
- Check [SECURITY.md](SECURITY.md) for verification steps

### Q: I sent tokens to the wrong address. What do I do?

**A:** Unfortunately, cryptocurrency transactions are **irreversible**. Once sent, tokens cannot be recovered unless:

**Recovery Options:**
1. **Contact the recipient** (if known)
2. **Contact the exchange** (if sent to an exchange)
3. **Report to authorities** (if fraud/scam)

**Prevention for future:**
1. **Always verify addresses** - Use ENS names when possible
2. **Start with test transactions** - Send small amounts first
3. **Use address books** - Save verified addresses
4. **Enable confirmation prompts** - Some wallets allow confirmation
5. **Double-check** - Verify recipient before confirming

**Report the incident:**
- **Abuse**: abuse@u.cash
- **Security**: security@u.cash
- **Telegram**: t.me/ucash

### Q: How do I know if a website is official?

**A:** **Official UCASH Websites:**
- u.cash
- u.onl
- un4.com
- ucosystem.com

**Official ENS:**
- ucash.eth
- ucash.u
- app.ucash.eth
- docs.ucash.eth

**Official Social Media:**
- Twitter: [@UdotCASH](https://twitter.com/UdotCASH) | [@ucashx](https://twitter.com/ucashx) | [@UdotONL](https://twitter.com/UdotONL)
- GitHub: [github.com/UdotCASH](https://github.com/UdotCASH)
- Telegram: [t.me/ucash](https://t.me/ucash)

**⚠️ Fake Websites (AVOID):**
- ucash.eth.com
- ucash.io
- ucash-token.com
- Any site not listed above

**Verification Steps:**
1. Check against this list
2. Verify social media links
3. Look for ENS verification
4. Confirm in official channels

### Q: Why are all subdomains "In Development"?

**A:** All 300+ subdomains are currently 🟡 **In Development** because:

1. **Infrastructure Deployment** - Subdomains are being configured and deployed
2. **Service Integration** - Connecting subdomains to backend services
3. **Testing** - Ensuring security and functionality
4. **Phased Rollout** - Gradual deployment across the ecosystem

**What "In Development" means:**
- ✅ Subdomain is registered and configured
- ✅ ENS records are set
- ⏳ Service backend is being deployed
- ⏳ Testing and security audits in progress

**When will they be live?**
- Follow official announcements on t.me/ucash
- Check [app.ens.domains/ucash.eth](https://app.ens.domains/ucash.eth?tab=subnames) for updates
- Monitor GitHub repository for changes

**Current Status:**
- All subdomains are operational for resolution
- Services are being deployed incrementally
- Security audits are ongoing

---

## Still Have Questions?

### Documentation Resources

- [Main README](README.md) - Overview and ecosystem information
- [NETWORKS.md](NETWORKS.md) - Multi-chain network details
- [WALLETS.md](WALLETS.md) - Wallet and explorer compatibility
- [ADDRESSES.md](ADDRESSES.md) - Verified addresses
- [SUBDOMAINS.md](SUBDOMAINS.md) - Complete subdomain directory
- [SECURITY.md](SECURITY.md) - Security best practices
- [INTEGRATION.md](INTEGRATION.md) - Developer integration guide

### Official Channels

**Contact:**
- **General**: info@u.cash
- **Security**: security@u.cash
- **Abuse**: abuse@u.cash

**Community:**
- **Telegram**: [t.me/ucash](https://t.me/ucash)
- **GitHub**: [github.com/UdotCASH](https://github.com/UdotCASH)
- **Twitter**: [@UdotCASH](https://twitter.com/UdotCASH) | [@ucashx](https://twitter.com/ucashx) | [@UdotONL](https://twitter.com/UdotONL)

**Websites:**
- [u.cash](https://u.cash) - Main website
- [u.onl](https://u.onl) - ONL ecosystem
- [un4.com](https://un4.com) - UN4 platform
- [ucosystem.com](https://ucosystem.com) - Ucosystem platform

### Get Help

1. **Search the documentation** - Check all .md files for answers
2. **Join the community** - Ask in t.me/ucash
3. **Open a GitHub issue** - [github.com/UdotCASH/ucash.eth/issues](https://github.com/UdotCASH/ucash.eth/issues)
4. **Contact support** - Email info@u.cash

### Reporting Issues

**Bug Reports:**
- Open a GitHub issue with detailed information
- Include steps to reproduce
- Provide screenshots if applicable

**Security Issues:**
- Email security@u.cash (private disclosure)
- Do NOT post publicly
- Include proof of concept

**Abuse/Scams:**
- Email abuse@u.cash
- Include evidence (screenshots, transaction hashes)
- Provide context and details

---

## 🎯 Quick Navigation

**📘 Documentation:**
- [README](README.md) • [NETWORKS](NETWORKS.md) • [WALLETS](WALLETS.md)
- [ADDRESSES](ADDRESSES.md) • [SUBDOMAINS](SUBDOMAINS.md) • [SECURITY](SECURITY.md)
- [INTEGRATION](INTEGRATION.md) • [FAQ](FAQ.md)

**🔗 External Links:**
- [ENS Manager](https://app.ens.domains/ucash.eth) •
[Etherscan](https://etherscan.io/token/0x92e52a1a235d9a103d970901066ce910aacefd37) •
[Website](https://u.cash)

[↑ Back to top](#faq-top)

---

*Last Updated: 2026-04-28*
*Repository: [github.com/UdotCASH/ucash.eth](https://github.com/UdotCASH/ucash.eth)*
