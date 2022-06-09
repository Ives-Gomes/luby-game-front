import React, { useState } from 'react';
import Web3 from 'web3';

import contractLubyGame from './contracts/LubyGame.json';

const contractAddress = '0x0007dDeF5dF376B90940a0F660534fdA5E8e4dFb';
const { abi } = contractLubyGame;

const App: React.FC = () => {
  const { ethereum } = window;

  const [currentAccount, setCurrentAccount] = useState('');

  const connectWallet = async () => {
    if (!ethereum) {
      console.log('Metamask is not installed!');

      return;
    }
    console.log('Metamask is here!!');

    try {
      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        console.log('No authorized accound found.');

        return;
      }

      console.log(`Account connected: ${accounts[0]}`);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const getBalance = async () => {
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(abi as any, contractAddress);

    const result = await contract.methods.getBalanceIndividual().call();

    console.log(result);
  };

  return (
    <div>
      <button type="button" onClick={connectWallet}>Connect Wallet</button>
      <button type="button" onClick={getBalance}>Get Balance</button>
      <p>{currentAccount}</p>
    </div>
  );
};

export default App;
