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

export const getOwner = async (currentAccount: string) => {
  try {
    const contract = getContract();

    const owner = await contract.methods
      .owner()
      .call({ from: currentAccount });

    return owner;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
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

export const getPlayerBalance = async (currentAccount: string) => {
  try {
    const contract = getContract();

    const playerBalance = await contract.methods
      .getBalanceIndividual()
      .call({ from: currentAccount });

    return playerBalance;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};

export const getBalance = async (currentAccount: string) => {
  try {
    if (currentAccount === '') {
      return;
    }

    const contract = getContract();

    const balance = await contract.methods
      .balanceOf(currentAccount)
      .call({ from: currentAccount });

    return balance;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};

export const getContractBalance = async (currentAccount: string) => {
  try {
    if (currentAccount === '') {
      return;
    }

    const contract = getContract();

    const balance = await contract.methods
      .balanceOf(contractAddress)
      .call({ from: currentAccount });

    return balance;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};

export const mintLBC = async (currentAccount: string) => {
  try {
    const web3 = getWeb3();
    const contract = getContract();

    await contract.methods
      .approve(web3.utils.toWei('10', 'ether'))
      .send({ from: currentAccount });

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

export const correctAnswer = async (currentAccount: string) => {
  try {
    const web3 = getWeb3();
    const contract = getContract();

    await contract.methods
      .approve(web3.utils.toWei('5', 'ether'))
      .send({ from: currentAccount });

    const result = await contract.methods
      .correctAnswer(web3.utils.toWei('5', 'ether'))
      .send({ from: currentAccount });

    if (result && result.transactionHash) {
      toast.success('Correct! You win 5 LBC!');
    }

    return result;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};

export const incorrectAnswer = async (currentAccount: string) => {
  try {
    const web3 = getWeb3();
    const contract = getContract();

    await contract.methods
      .approve(web3.utils.toWei('5', 'ether'))
      .send({ from: currentAccount });

    const result = await contract.methods
      .incorrectAnswer(web3.utils.toWei('5', 'ether'))
      .send({ from: currentAccount });

    if (result && result.transactionHash) {
      toast.error('Wrong! You lose 5 LBC.');
    }

    return result;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};

export const claimBalance = async (currentAccount: string) => {
  try {
    const web3 = getWeb3();
    const contract = getContract();

    const playerBalance = await getPlayerBalance(currentAccount) as number;

    const contractBalance = await getContractBalance(currentAccount) as number;

    console.log(typeof playerBalance);

    if (Number(playerBalance) === 0) {
      toast.warn('You have no balance!');

      return;
    }

    if (Number(contractBalance) < Number(playerBalance)) {
      toast.warn('There is not enough balance!');

      return;
    }

    await contract.methods
      .approve(web3.utils.toWei('1', 'ether'))
      .send({ from: currentAccount });

    const result = await contract.methods
      .claimBalance(web3.utils.toWei('1', 'ether'))
      .send({ from: currentAccount });

    if (result && result.transactionHash) {
      toast.success('Claimed! Check your wallet.');
    }

    return result;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};

export const withdrawBalance = async (currentAccount: string) => {
  try {
    const web3 = getWeb3();
    const contract = getContract();

    const contractBalance = await getContractBalance(currentAccount) as number;

    if (Number(contractBalance) === 0) {
      toast.warn('You have no balance!');

      return;
    }

    await contract.methods
      .approve(web3.utils.toWei('1', 'ether'))
      .send({ from: currentAccount });

    const result = await contract.methods
      .withdraw()
      .send({ from: currentAccount });

    if (result && result.transactionHash) {
      toast.success('Claimed! Check your wallet.');
    }

    return result;
  } catch (err) {
    console.log(err);

    toast.warn('Something went wrong. Try again later.');
  }
};
