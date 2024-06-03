# Fullstack Ethereum Development

> Original Post: [dev.to](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13) <br>
> Original Video: [youtube](https://www.youtube.com/watch?v=a0osIaAOFSE)

## Setup Project
1. `npx create-react-app fullstack-ethereum-development`
2. `cd fullstack-ethereum-development`
3. `npm install --save-dev @nomicfoundation/hardhat-toolbox`
4. `npx hardhat init`

## Configuration
Configure the environments on `hardhat.config.js`
1. Add`paths` to set the artifacts build path. (opt.)
2. Add `networks` to set the target EVM platform.

## Deploy
1. `npx hardhat node` to run local testnet
2. `npx hardhat ignition deploy ignition/modules/Lock.js --network localhost`
<br>
(Hardhat recommends `npx hardhat ignition`, not `npx hardhat run`)