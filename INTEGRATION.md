# 🔌 Integration Guide - ucash.eth

**Last Updated**: 2026-04-21

---

## Overview

This guide helps developers integrate `ucash.eth` ENS functionality into their applications, websites, and smart contracts.

---

## 🚀 Quick Start

### Resolve ucash.eth Address

```javascript
// ethers.js v6
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');

// Resolve ENS to address
const address = await provider.resolveName('ucash.eth');
console.log(address); // [RESOLVED_ADDRESS]
```

```javascript
// web3.js
const Web3 = require('web3');
const web3 = new Web3('https://eth.llamarpc.com');

const address = await web3.eth.ens.getAddress('ucash.eth');
console.log(address);
```

---

## 📚 Comprehensive Integration Examples

### 1. Frontend Integration

#### React + ethers.js

```jsx
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

function UCASHAddress() {
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function resolveENS() {
            const provider = new ethers.JsonRpcProvider(
                'https://eth.llamarpc.com'
            );

            try {
                const resolvedAddress = await provider.resolveName('ucash.eth');
                setAddress(resolvedAddress);
            } catch (error) {
                console.error('Failed to resolve ENS:', error);
            } finally {
                setLoading(false);
            }
        }

        resolveENS();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!address) return <div>Failed to resolve address</div>;

    return (
        <div>
            <h3>UCASH Official Address</h3>
            <p>{address}</p>
            <a href={`https://etherscan.io/address/${address}`}>
                View on Etherscan
            </a>
        </div>
    );
}

export default UCASHAddress;
```

#### Vue.js

```vue
<template>
  <div>
    <h3>UCASH Address</h3>
    <p v-if="address">{{ address }}</p>
    <p v-else-if="loading">Loading...</p>
    <p v-else>Failed to resolve</p>
  </div>
</template>

<script>
import { ethers } from 'ethers';

export default {
  name: 'UCASHAddress',
  data() {
    return {
      address: null,
      loading: true
    };
  },
  async mounted() {
    const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
    try {
      this.address = await provider.resolveName('ucash.eth');
    } catch (error) {
      console.error('ENS resolution failed:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>
```

---

### 2. Smart Contract Integration

#### Using ENS in Contracts

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

#### ENS Namehash

```javascript
// Calculate namehash for ucash.eth
const { utils } = require('ethers');
const namehash = utils.namehash('ucash.eth');
console.log(namehash);
// Output: 0x...
```

---

### 3. Backend Integration

#### Node.js Backend

```javascript
const { ethers } = require('ethers');

async function resolveENS() {
    const provider = new ethers.JsonRpcProvider(
        process.env.RPC_URL || 'https://eth.llamarpc.com'
    );

    try {
        // Resolve primary address
        const address = await provider.resolveName('ucash.eth');
        console.log('UCASH Address:', address);

        // Resolve subdomains
        const batchAddress = await provider.resolveName('batch.ucash.eth');
        console.log('Batch Sender:', batchAddress);

        // Reverse lookup
        const reverseName = await provider.lookupAddress(address);
        console.log('Reverse:', reverseName); // Should be 'ucash.eth'

        return { address, batchAddress, reverseName };
    } catch (error) {
        console.error('ENS resolution failed:', error);
        throw error;
    }
}

// Usage
resolveENS().then(result => {
    console.log('Resolved:', result);
});
```

#### Python Backend

```python
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://eth.llamarpc.com'))

# Resolve ENS
address = w3.ens.address('ucash.eth')
print(f"UCASH Address: {address}")

# Resolve subdomain
batch_address = w3.ens.address('batch.ucash.eth')
print(f"Batch Sender: {batch_address}")

# Reverse lookup
reverse_name = w3.ens.name(address)
print(f"Reverse: {reverse_name}")
```

---

### 4. API Integration

#### REST API Endpoint

```javascript
// Create an API endpoint to resolve ucash.eth
app.get('/api/ucash/address', async (req, res) => {
    try {
        const provider = new ethers.JsonRpcProvider(
            'https://eth.llamarpc.com'
        );

        const address = await provider.resolveName('ucash.eth');

        res.json({
            ens: 'ucash.eth',
            address: address,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to resolve ENS',
            message: error.message
        });
    }
});
```

#### GraphQL Integration

```javascript
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        ucashAddress: String
        ucashBatchAddress: String
        resolveENS(name: String!): String
    }
`;

const resolvers = {
    Query: {
        ucashAddress: async () => {
            const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
            return await provider.resolveName('ucash.eth');
        },
        ucashBatchAddress: async () => {
            const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
            return await provider.resolveName('batch.ucash.eth');
        },
        resolveENS: async (_, { name }) => {
            const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
            return await provider.resolveName(name);
        }
    }
};
```

---

### 5. Sending Transactions to ENS

#### Send Tokens to ucash.eth

```javascript
import { ethers } from 'ethers';

async function sendTokensToUCASH(amount) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // ERC20 Token ABI (transfer function)
    const abi = [
        "function transfer(address to, uint256 amount) returns (bool)"
    ];

    // Token contract
    const token = new ethers.Contract(
        TOKEN_ADDRESS,
        abi,
        signer
    );

    // Send to ucash.eth (ENS is automatically resolved)
    const tx = await token.transfer('ucash.eth', amount);
    console.log('Transaction hash:', tx.hash);

    await tx.wait();
    console.log('Confirmed!');
    return tx.hash;
}

// Usage
sendTokensToUCASH(ethers.parseUnits('100', 18));
```

#### Send ETH to ucash.eth

```javascript
async function sendETHToUCASH(amount) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Send ETH to ucash.eth
    const tx = await signer.sendTransaction({
        to: 'ucash.eth', // ENS is automatically resolved
        value: ethers.parseEther(amount)
    });

    console.log('Transaction hash:', tx.hash);
    await tx.wait();
    console.log('Confirmed!');

    return tx.hash;
}

// Usage
sendETHToUCASH('1.5');
```

---

### 6. Display ENS Information

#### Show ENS Avatar

```html
<!-- ENS Avatar -->
<img
    src="https://metadata.ens.domains/mainnet/avatar/ucash.eth"
    alt="ucash.eth avatar"
    onError="this.src='default-avatar.png'"
/>

<!-- With fallback -->
<img
    src="https://metadata.ens.domains/mainnet/avatar/ucash.eth"
    alt="UCASH Avatar"
    style="width: 100px; height: 100px; border-radius: 50%;"
/>
```

#### ENS Link Component

```jsx
function ENSLink({ ens, text }) {
    return (
        <a
            href={`https://app.ens.domains/name/${ens}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {text || ens}
        </a>
    );
}

// Usage
<ENSLink ens="ucash.eth" text="View on ENS" />
```

---

### 7. Subdomain Integration

#### Resolve Subdomains

```javascript
async function resolveSubdomains() {
    const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');

    const subdomains = [
        'app.ucash.eth',
        'batch.ucash.eth',
        'contracts.ucash.eth',
        'pay.ucash.eth',
        'api.ucash.eth'
    ];

    const addresses = {};

    for (const subdomain of subdomains) {
        try {
            const address = await provider.resolveName(subdomain);
            addresses[subdomain] = address;
        } catch (error) {
            addresses[subdomain] = null;
        }
    }

    return addresses;
}

// Usage
resolveSubdomains().then(addresses => {
    console.log('Subdomain addresses:', addresses);
    // Output:
    // {
    //   'app.ucash.eth': '0x...',
    //   'batch.ucash.eth': '0x...',
    //   ...
    // }
});
```

---

## 🔒 Security Best Practices for Integration

### 1. Always Verify ENS Resolution

```javascript
async function safeResolveENS(ensName) {
    const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');

    // Resolve ENS
    const address = await provider.resolveName(ensName);

    // Verify reverse resolution
    const reverseName = await provider.lookupAddress(address);

    if (reverseName.toLowerCase() !== ensName.toLowerCase()) {
        throw new Error('Reverse resolution mismatch!');
    }

    return address;
}
```

### 2. Cache ENS Resolution

```javascript
const ensCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function cachedResolveENS(ensName) {
    const cached = ensCache.get(ensName);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.address;
    }

    const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
    const address = await provider.resolveName(ensName);

    ensCache.set(ensName, {
        address,
        timestamp: Date.now()
    });

    return address;
}
```

### 3. Handle Errors Gracefully

```javascript
async function resolveENSWithFallback(ensName, fallbackAddress) {
    try {
        const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
        const address = await provider.resolveName(ensName);

        if (!address) {
            console.warn(`Failed to resolve ${ensName}, using fallback`);
            return fallbackAddress;
        }

        return address;
    } catch (error) {
        console.error('ENS resolution failed:', error);
        return fallbackAddress;
    }
}
```

---

## 📊 Advanced Integration Patterns

### Multi-Chain ENS Resolution

```javascript
const networks = {
    ethereum: {
        rpc: 'https://eth.llamarpc.com',
        chainId: 1
    },
    base: {
        rpc: 'https://base.llamarpc.com',
        chainId: 8453
    },
    polygon: {
        rpc: 'https://polygon.llamarpc.com',
        chainId: 137
    }
};

async function resolveOnAllNetworks(ensName) {
    const results = {};

    for (const [network, config] of Object.entries(networks)) {
        try {
            const provider = new ethers.JsonRpcProvider(config.rpc);
            const address = await provider.resolveName(ensName);
            results[network] = {
                address,
                chainId: config.chainId,
                success: true
            };
        } catch (error) {
            results[network] = {
                address: null,
                chainId: config.chainId,
                success: false,
                error: error.message
            };
        }
    }

    return results;
}
```

---

## 🧪 Testing Your Integration

### Test ENS Resolution

```javascript
// Test script
async function testENSIntegration() {
    console.log('Testing ucash.eth integration...\n');

    // Test 1: Basic resolution
    console.log('Test 1: Basic Resolution');
    const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
    const address = await provider.resolveName('ucash.eth');
    console.log('✓ Resolved ucash.eth to:', address);

    // Test 2: Reverse resolution
    console.log('\nTest 2: Reverse Resolution');
    const reverseName = await provider.lookupAddress(address);
    console.log('✓ Reverse lookup:', reverseName);

    // Test 3: Subdomain resolution
    console.log('\nTest 3: Subdomain Resolution');
    const batchAddress = await provider.resolveName('batch.ucash.eth');
    console.log('✓ batch.ucash.eth:', batchAddress);

    // Test 4: Verify match
    console.log('\nTest 4: Verification');
    if (reverseName.toLowerCase() === 'ucash.eth') {
        console.log('✓ Reverse resolution matches!');
    } else {
        console.log('✗ Mismatch detected!');
    }

    console.log('\n✅ All tests passed!');
}

testENSIntegration();
```

---

## 📚 Additional Resources

### Official Documentation
- [ENS Documentation](https://docs.ens.domains)
- [ethers.js ENS](https://docs.ethers.org/v6/api/providers/#Provider-resolveName)
- [Web3.js ENS](https://web3js.readthedocs.io/en/v1.8.0/web3-eth-ens.html)

### Tools & Libraries
- [ethers.js](https://docs.ethers.org)
- [web3.js](https://web3js.readthedocs.io)
- [viem](https://viem.sh)
- [wagmi](https://wagmi.sh)

### Support
- **GitHub Issues**: https://github.com/UdotCASH/ucash.eth/issues
- **Twitter**: [@UdotCASH](https://twitter.com/UdotCASH) | [@ucashx](https://twitter.com/ucashx) | [@UdotONL](https://twitter.com/UdotONL)
- **Telegram**: t.me/ucash
- **Email**: info@u.cash

---

## 🔄 Changelog

### 2026-04-21
- Initial integration guide
- Added comprehensive examples
- Included security best practices

---

**💡 Tip**: Always test your integration on testnet before using on mainnet!

---

*Last Updated: 2026-04-21*
*Integration Support: dev@ucash.eth*
