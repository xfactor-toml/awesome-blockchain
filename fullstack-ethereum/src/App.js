import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Lock from './artifacts/contracts/Lock.sol/Lock.json';

import './App.css';

const lockAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [amount, setAmount] = useState('');
  const [unlockTime, setUnlockTime] = useState('');

  async function requestAccount() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      console.log('Error: ', err);
    }
  }

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

  useEffect(() => {
    (async () => {
      if (amount) return;
  
      await fetchLockedAmount();
    })();
  }, [amount]);

  useEffect(() => {
    (async () => {
      if (unlockTime) return;
  
      await fetchUnlockTime();
    })();
  }, [unlockTime]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {amount ? amount.toString() : 0} is locked until {unlockTime ? unlockTime.toString() : 0}
        </p>
        <button onClick={withdraw}>
          Withdraw
        </button>
      </header>
    </div>
  );
}

export default App;
