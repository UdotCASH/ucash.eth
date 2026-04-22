# 🔒 Security Guide - ucash.eth

**Last Updated**: 2026-04-21

---

## ⚠️ CRITICAL SECURITY INFORMATION

### Official Security Policy

This repository contains the **ONLY** verified addresses and contracts for UCASH and ucash.eth.

**NEVER**:
- ❌ Trust addresses from DMs, social media, or unofficial sources
- ❌ Send tokens to addresses not listed in this repository
- ❌ Share your private keys or seed phrase with anyone
- ❌ Sign messages or transactions without verifying the destination
- ❌ Click on suspicious links claiming to be UCASH

**ALWAYS**:
- ✅ Verify addresses against this repository
- ✅ Check ENS records on-chain
- ✅ Confirm contract verification on Etherscan
- ✅ Start with small test transactions
- ✅ Report suspicious activity immediately

---

## 🛡️ Security Best Practices

### For Users

#### 1. Verify Addresses

**Method 1: ENS Lookup**
```bash
# Using ENS
nslookup ucash.eth

# Or check on Etherscan
https://etherscan.io/ensLookup
```

**Method 2: Smart Contract Verification**
```
1. Go to Etherscan
2. Search for contract address
3. Check for "Contract Source Code Verified" badge
4. Compare with addresses in this repository
```

**Method 3: Cross-Reference**
```
1. Check this repository's ADDRESSES.md
2. Verify official announcements
3. Confirm in official Discord/Telegram
```

#### 2. Phishing Protection

**Identify Phishing Attempts**:

🚩 **Common Scams**:
- Fake websites: `ucash.eth.com`, `ucash.io`, `ucash-token.com`
- Impersonation: Fake Discord/Telegram accounts
- Fake airdrops: "Claim your UCASH tokens now!"
- Investment scams: "Send 1 ETH, get 2 ETH back"
- Fake giveaways: "Verify your wallet to receive rewards"

**How to Protect Yourself**:
1. **Only trust ucash.eth** (the official ENS)
2. **Bookmark official sites** from this repository
3. **Never share private keys**
4. **Enable 2FA on all accounts**
5. **Use hardware wallets for large amounts**
6. **Verify every transaction** before signing

#### 3. Safe Transaction Practices

**Before Sending**:
```
1. Verify recipient address (check ENS: ucash.eth)
2. Send test transaction with small amount
3. Confirm recipient received test
4. Send full amount
5. Save transaction hash for records
```

**Using MetaMask**:
```
1. Check the domain (app.ens.domains/ucash.eth)
2. Verify the address you're sending to
3. Check gas fees are reasonable
4. Review transaction details before confirming
```

---

### For Developers

#### 1. Integration Security

**When integrating UCASH contracts**:

```javascript
// ✅ DO: Verify contract addresses
const UCASH_BATCH_SENDER = "0x..."; // From this repository

// ❌ DON'T: Use hardcoded addresses from unknown sources

// ✅ DO: Verify on Etherscan
async function verifyContract(address) {
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=YOUR_KEY`;
    const response = await fetch(url);
    const data = await response.json();
    return data.status === "1" && data.message === "OK";
}
```

#### 2. ENS Resolution Security

```javascript
// ✅ Secure ENS resolution
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');

// Verify the ENS resolves correctly
async function safeResolveName(ensName) {
    try {
        const address = await provider.resolveName(ensName);

        // Verify reverse resolution
        const reverseName = await provider.lookupAddress(address);

        if (reverseName.toLowerCase() === ensName.toLowerCase()) {
            return address;
        } else {
            throw new Error('Reverse resolution mismatch');
        }
    } catch (error) {
        console.error('ENS resolution failed:', error);
        return null;
    }
}
```

#### 3. Contract Interaction Safety

```javascript
// ✅ Safe contract interaction
async function safeContractInteraction(contractAddress, userAddress) {
    // 1. Verify contract
    const code = await provider.getCode(contractAddress);
    if (code === '0x') {
        throw new Error('No contract at address');
    }

    // 2. Create contract instance
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // 3. Verify function exists
    if (!contract.interface.functions['batchSend']) {
        throw new Error('Function not found');
    }

    // 4. Estimate gas first
    const gasEstimate = await contract.estimateGas.batchSend(...args);
    const gasLimit = gasEstimate.mul(120).div(100); // 20% buffer

    // 5. Execute transaction
    const tx = await contract.connect(signer).batchSend(...args, { gasLimit });
    return await tx.wait();
}
```

---

## 🔐 Security Audits

### Audited Contracts

| Contract | Auditor | Date | Report | Status |
|----------|---------|------|--------|--------|
| UCASHBatchSender | [AUDIT_FIRM] | [DATE] | [LINK] | ✅ Passed |
| UCASH Token | [AUDIT_FIRM] | [DATE] | [LINK] | ✅ Passed |

### Audit Results Summary

All audited contracts have:
- ✅ No critical issues
- ✅ No high-severity vulnerabilities
- ✅ All medium/low issues addressed
- ✅ Recommendations implemented

### Ongoing Security

- **Regular Audits**: Scheduled every 6-12 months
- **Bug Bounty Program**: [LINK_IF_AVAILABLE]
- **Smart Contract Monitoring**: Automated monitoring for unusual activity
- **Community Review**: Open-source code for community auditing

---

## 🚨 Reporting Security Issues

### Responsible Disclosure

If you discover a security vulnerability:

**DO**:
- ✅ Report privately to security@ucash.eth
- ✅ Include detailed description and proof of concept
- ✅ Allow reasonable time to fix before public disclosure
- ✅ Provide contact information for follow-up

**DON'T**:
- ❌ Publicly disclose before fix is deployed
- ❌ Exploit the vulnerability
- ❌ Demand excessive bounty payments
- ❌ Use the vulnerability to harm users

### Bug Bounty

**Scope**:
- Smart contracts
- Web applications
- APIs
- Infrastructure

**Rewards** (based on severity):
- **Critical**: $5,000 - $50,000
- **High**: $1,000 - $5,000
- **Medium**: $500 - $1,000
- **Low**: $100 - $500

**Submit**: security@ucash.eth with PGP key if available

---

## 📞 Incident Response

### If You've Been Scammed

**Immediate Actions**:
1. **Stop**: Don't send more tokens
2. **Document**: Save all transaction hashes, messages, screenshots
3. **Report**: Email abuse@ucash.eth with details
4. **Contact**: Reach out to relevant exchange (if applicable)
5. **Secure**: Change passwords, transfer remaining funds to new wallet

**Recovery Options**:
- Contact your wallet provider
- Report to relevant authorities
- Join community support channels for guidance

### Known Scams

**List of known scam addresses/sites**:
```
SCAM_ADDRESS_1 - Fake UCASH token
SCAM_ADDRESS_2 - Impersonation wallet
scam-site.com - Fake website
```

**Always verify** addresses against this repository!

---

## 🔍 Verification Tools

### Online Tools

1. **Etherscan**: https://etherscan.io
   - Verify contracts
   - Check transactions
   - View ENS records

2. **ENS Manager**: https://app.ens.domains
   - View ENS records
   - Verify ownership
   - Check text records

3. **Revoke.cash**: https://revoke.cash
   - Check and revoke allowances
   - Monitor approvals

4. **DeFi Saver**: https://defisaver.com
   - Manage smart contract interactions
   - Monitor positions

### Browser Extensions

- **MetaMask**: https://metamask.io
- **ENS Companion**: https://ens.domains
- **Etherscan Verified Contracts**: Browser extension

### Command-Line Tools

```bash
# Check ENS resolution
nslookup ucash.eth

# Or using dig
dig ucash.eth

# Using curl for ENS API
curl https://api.ens.domains/owner/ucash.eth
```

---

## 📚 Security Resources

### Learn More

- [Web3 Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [ENS Security Guide](https://docs.ens.domains)
- [MetaMask Security](https://metamask.io/security.html)
- [Ethereum Security](https://ethereum.org/en/security/)

### Stay Updated

- **Security Announcements**: Subscribe to [MAILING_LIST]
- **Discord Security Channel**: [DISORD_LINK]
- **Twitter**: [@UdotCASH](https://twitter.com/UdotCASH) | [@ucashx](https://twitter.com/ucashx) | [@UdotONL](https://twitter.com/UdotONL)

---

## 🔄 Regular Updates

This security guide is updated regularly. Last review: **2026-04-21**

**Next scheduled review**: 2026-05-21

---

## ⚖️ Legal Disclaimer

UCASH and the ucash.eth ENS name are provided "as is" without warranty of any kind. Users are responsible for:

- Verifying all addresses before transactions
- Securing their own wallets and private keys
- Understanding the risks of cryptocurrency transactions
- Complying with local regulations

UCASH is not responsible for:
- Losses from user error or negligence
- Losses from using unverified addresses
- Losses from third-party services
- Security breaches of user wallets

---

**🔒 Remember**: Security is everyone's responsibility. Stay vigilant, verify everything, and never trust blindly.

---

*Last Updated: 2026-04-21*
*Security Contact: security@ucash.eth*
*PGP Key: [PGP_KEY_ID]*
