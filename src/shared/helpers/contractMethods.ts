import Web3 from 'web3';
import { toast } from 'react-toastify';

import contractLubyGame from '@contracts/LubyGame.json';

const contractAddress = '0x0007dDeF5dF376B90940a0F660534fdA5E8e4dFb';
const { abi } = contractLubyGame;
const { ethereum } = window;

export const getWeb3 = () => new Web3(window.ethereum);

export const getContract = () => {
  const web3 = getWeb3();

  return new web3.eth.Contract(abi as any, contractAddress);
};

export const metamaskInstalled = () => {
  if (!ethereum) {
    return false;
  }

  return true;
};

export const connectWallet = async () => {
  try {
    const web3 = getWeb3();

    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) {
      return 'No authorized accound found. Please check your Metamask.';
    }

    return accounts[0];
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};

export const getPlayerBalance = async () => {
  try {
    const contract = getContract();

    const playerBalance = await contract.methods.getBalanceIndividual().call();

    return playerBalance;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};

export const getGameBalance = async () => {
  try {
    const contract = getContract();

    const gameBalance = await contract.methods.balanceOf(contractAddress).call();

    return gameBalance;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};

export const mintLBC = async (currentAccount: string) => {
  try {
    const web3 = getWeb3();
    const contract = getContract();

    const result = await contract.methods
      .mintLbc(web3.utils.toWei('10', 'ether'))
      .send({ from: currentAccount });

    if (result.transactionHash) {
      toast.success('Minted 10LBC!');
    }

    return result;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};

export const startGame = async (currentAccount: string) => {
  try {
    const web3 = getWeb3();
    const contract = getContract();

    await contract.methods
      .approve(web3.utils.toWei('5', 'ether'))
      .send({ from: currentAccount });

    const result = await contract.methods
      .startGame(web3.utils.toWei('5', 'ether'))
      .send({ from: currentAccount });

    if (result && result.transactionHash) {
      toast.success('Game Started!');
    }

    return result;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};
