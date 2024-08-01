# Fullstack Ethereum Development

> Original Post: [dev.to](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13) <br>
> Original Video: [youtube](https://www.youtube.com/watch?v=a0osIaAOFSE)

## 1. Setup Project
1. `npx create-react-app fullstack-ethereum-development`
2. `cd fullstack-ethereum-development`
3. `npm install --save-dev @nomicfoundation/hardhat-toolbox`
4. `npx hardhat init`

## 2. Configuration
Configure the environments on `hardhat.config.js`
1. Add`paths` to set the artifacts build path. (opt.)
2. Add `networks` to set the target EVM platform.

## 3. Deploy
1. `npx hardhat node` to run local testnet
2. `npx hardhat ignition deploy ignition/modules/Lock.js --network localhost`
<br>
(Hardhat recommends `npx hardhat ignition`, not `npx hardhat run`)

## 4. Integration

### 4.1 Add `abi` and `ethers` on `src/App.js`

```javascript
import { useState } from 'react';
import { ethers } from 'ethers';

import Lock from './artifacts/contracts/Lock.sol/Lock.json';

const LockAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
```

### 4.2 Add 4 functions on `src/App.js` to interact with smart contract

```javascript
const [amount, setAmount] = useState();
const [unlockTime, setUnlockTime] = useState();

async function requestAccount() {}

async function withdraw() {}

async function fetchLockedAmount() {}

async function fetchUnlockTime() {}
```

> ***Current Tutorial is using [ethers.js v6](https://docs.ethers.org/v6/getting-started)***

#### 4.2.1 Implement `fetchLockedAmount`

```javascript
async function fetchLockedAmount() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);

        try {
            const data = await provider.getBalance(lockAddress);

            setAmount(data);
        } catch (err) {
            console.log('Error: ', err);
        }
    }
}
```

#### 4.2.2 Implement `fetchUnlockTime`

```javascript
async function fetchUnlockTime() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(lockAddress, Lock.abi, provider);

        try {
            const data = await contract.unlockTime();

            setUnlockTime(data);
        } catch (err) {
            console.log('Error: ', err);
        }
    }
}
```

#### 4.2.3 Implement `requestAccount`

```javascript
async function requestAccount() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
        console.log('Error: ', err);
    }
}
```

#### 4.2.4 Implement `withdraw`

```javascript
async function withdraw() {
    try {
        if (!amount || !unlockTime) return;
    
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
    
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            console.log(1);

            if (!signer) {
                throw new Error("Signer not available");
            }

            const contract = new ethers.Contract(lockAddress, Lock.abi, signer);
            const transaction = await contract.withdraw();
    
            await transaction.wait();
    
            await fetchLockedAmount();
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}
```

## Contribution Guide
If you want to contribute, please fork, add your changes and then send pull request.
