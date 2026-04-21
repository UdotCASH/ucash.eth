# 📋 Verified Addresses - ucash.eth

**Last Updated**: 2025-04-21
**Repository**: https://github.com/UdotCASH/ucash.eth

---

## ⚠️ IMPORTANT SECURITY NOTICE

**Always verify addresses from this repository. Never trust addresses from unofficial sources, DMs, or unverified channels.**

Official UCASH team will **NEVER**:
- ❌ DM you first asking for funds
- ❌ Request your private keys
- ❌ Ask you to send tokens to "verify" your wallet
- ❌ Promise returns that are too good to be true

---

## 🔍 Quick Verification

### Primary ENS
```
ENS: ucash.eth
Status: ✅ Active
Owner: [OWNER_ADDRESS]
```

### Verification Methods

1. **ENS Lookup**: https://app.ens.domains/name/ucash.eth
2. **Etherscan**: Check ENS reverse records
3. **This Repository**: Cross-reference with addresses below

---

## 💰 Wallet Addresses

### Ethereum Mainnet

| Purpose | Address | ENS | Verified |
|---------|---------|-----|----------|
| **Primary/Treasury** | `[PRIMARY_ADDRESS]` | `ucash.eth` | ✅ |
| **Operations** | `[OPS_ADDRESS]` | `ops.ucash.eth` | ✅ |
| **Development** | `[DEV_ADDRESS]` | `dev.ucash.eth` | ✅ |
| **Marketing** | `[MKT_ADDRESS]` | `marketing.ucash.eth` | ✅ |
| **Community** | `[COMMUNITY_ADDRESS]` | `community.ucash.eth` | ✅ |

### Multi-Chain Wallets

| Network | Address | ENS | Explorer |
|---------|---------|-----|----------|
| **Base** | `[BASE_ADDRESS]` | `base.ucash.eth` | [Basescan](https://basescan.org) |
| **Polygon** | `[POLYGON_ADDRESS]` | `polygon.ucash.eth` | [Polygonscan](https://polygonscan.com) |
| **Arbitrum** | `[ARBITRUM_ADDRESS]` | `arbitrum.ucash.eth` | [Arbiscan](https://arbiscan.io) |
| **Optimism** | `[OPTIMISM_ADDRESS]` | `optimism.ucash.eth` | [Optimism Etherscan](https://optimism.etherscan.io) |

---

## 📜 Smart Contracts

### Ethereum Mainnet Contracts

#### UCASH Batch Sender
```
Name: UCASHBatchSender
Address: [CONTRACT_ADDRESS]
ENS: batch.ucash.eth
Verified: ✅ Verified on Etherscan
Etherscan: https://etherscan.io/address/[CONTRACT_ADDRESS]
Deployed: [DATE]
```

**Purpose**: Gas-optimized batch token distribution

**Key Features**:
- Support for up to 1000 recipients per transaction
- 28.5% gas savings through optimization
- ReentrancyGuard protection
- Pausable for emergency stops

#### UCASH Token (if deployed)
```
Name: UCASH
Symbol: UCASH
Address: [TOKEN_ADDRESS]
Decimals: 18
Verified: ✅ Verified on Etherscan
Etherscan: https://etherscan.io/address/[TOKEN_ADDRESS]
```

### Testnet Contracts

#### Sepolia Testnet
```
Batch Sender: [SEPOLIA_BATCH_ADDRESS]
Token: [SEPOLIA_TOKEN_ADDRESS]
Network: Sepolia
Explorer: https://sepolia.etherscan.io
Status: ✅ Active for Testing
```

---

## 🔗 Service Addresses

### Infrastructure Services

| Service | Address | ENS | Purpose |
|---------|---------|-----|---------|
| **API** | `[API_ADDRESS]` | `api.ucash.eth` | API endpoints |
| **Bridge** | `[BRIDGE_ADDRESS]` | `bridge.ucash.eth` | Cross-chain bridge |
| **Payment** | `[PAYMENT_ADDRESS]` | `pay.ucash.eth` | Payment processor |
| **Staking** | `[STAKING_ADDRESS]` | `stake.ucash.eth` | Staking contract |

---

## 📊 Address Changes & History

### Recent Changes

| Date | Type | Description |
|------|------|-------------|
| YYYY-MM-DD | Update | Initial repository creation |
| YYYY-MM-DD | Change | [Description of change] |

### Migration History

If any addresses have been migrated or deprecated, they will be listed here.

---

## 🔒 Security Checks

### Before Sending Tokens

1. ✅ **Verify ENS**: Check `ucash.eth` resolves correctly
2. ✅ **Cross-Reference**: Confirm address matches this repository
3. ✅ **Etherscan Check**: Verify contract is verified (if applicable)
4. ✅ **Official Channel**: Confirm via official Discord/Telegram
5. ✅ **Start Small**: Send test transaction with small amount

### Red Flags

🚩 **Warning Signs of Scams**:
- Addresses not listed in this repository
- Unsolicited DMs asking for funds
- Promises of unrealistic returns
- Urgency tactics ("act now!")
- Fake ENS names (e.g., ucash.eth.com, ucash.io)

---

## 📞 Report Issues

### Security Issues
If you discover a security vulnerability:
- **Email**: security@ucash.eth
- **PGP Key**: [PGP_KEY_ID] (if available)

### Report Phishing
If you encounter phishing attempts:
- **Email**: abuse@ucash.eth
- **Include**: Screenshots, addresses used, transaction hashes

### General Inquiries
- **Email**: contact@ucash.eth
- **Discord**: [OFFICIAL_DISCORD_LINK]
- **Telegram**: t.me/ucash_official

---

## 📋 Contract Verification Checklist

When verifying UCASH contracts, check:

- [ ] Source code is verified on Etherscan
- [ ] Contract address matches this repository
- [ ] ENS record points to correct address
- [ ] ABI is available for integration
- [ ] Audit report is available (if applicable)
- [ ] Official announcement exists

---

## 🔄 Auto-Update Script

For developers who want to automatically verify addresses:

```bash
#!/bin/bash
# verify-ucash-addresses.sh

echo "Verifying ucash.eth addresses..."

# Get primary address
ADDRESS=$(nslookup ucash.eth | grep "Address:" | tail -1 | awk '{print $2}')
echo "Primary Address: $ADDRESS"

# Verify on Etherscan
echo "Checking Etherscan..."
curl -s "https://api.etherscan.io/api?module=account&action=balance&address=$ADDRESS&tag=latest&apikey=YOUR_API_KEY"

# More verification...
```

---

## 📚 Additional Resources

- [Main README](./README.md)
- [Security Guide](./SECURITY.md)
- [Integration Guide](./INTEGRATION.md)
- [Subdomain Info](./SUBDOMAINS.md)

---

**⚠️ FINAL REMINDER**: This is the ONLY official source for UCASH addresses. Always verify against this repository before sending funds, tokens, or interacting with any contracts.

---

*Last Updated: 2025-04-21*
*Next Review: 2025-05-21*
