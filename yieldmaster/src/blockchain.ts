import { ethers } from 'ethers';
import Staking from '../yieldmaster-smart-contracts/build/contracts/Staking.json';
import LiquidityPool from '../yieldmaster-smart-contracts/build/contracts/LiquidityPool.json';

declare global {
  interface Window {
    ethereum: any;
  }
}

// Initialize provider and signer
const provider = new ethers.BrowserProvider(window.ethereum); 
const getSigner = async () => await provider.getSigner();


// Contract addresses
const stakingAddress = "0x43870752C01C4B3c345235F80fb669BEBf701adC";
const liquidityPoolAddress = "0x45d16D54E809407533d2557889a3a780225102A3";
// Get the staking contract instance
const getStakingContract = async () => {
  return new ethers.Contract(stakingAddress, Staking.abi, await getSigner());
};

// Get the liquidity pool contract instance
const getLiquidityPoolContract = async () => {
  return new ethers.Contract(liquidityPoolAddress, LiquidityPool.abi, await getSigner());
};

// Get the staking balance for the current user
export const getStakingBalance = async () => {
  try {
    const stakingContract = await getStakingContract();
    console.log("stakingContracsssst: ", stakingContract);
    const signerAddress = await (await getSigner()).getAddress();
    console.log("signeraddress: ", signerAddress);
    
    const balance = await stakingContract.getBalance(signerAddress);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Failed to get staking balance:', error);
    throw error;
  }
};

// Get the liquidity pool balance for the current user
export const getLiquidityPoolBalance = async () => {
  const liquidityPoolContract = await getLiquidityPoolContract();
  const signerAddress = await (await getSigner()).getAddress();
  const balance = await liquidityPoolContract.balances(signerAddress); // Replace with the correct method
  return ethers.formatEther(balance);
};

// Function to stake an amount
export const stake = async (amount: string) => {
  try {
    const stakingContract = await getStakingContract();
    console.log('Staking contract:', stakingContract);

    const signerAddress = await (await getSigner()).getAddress();
    console.log('Signer address:', signerAddress);

    const txResponse = await stakingContract.stake({ value: ethers.parseEther(amount) });
    console.log('TX response:', txResponse);
    await txResponse.wait();
  } catch (error) {
    console.error('Failed to stake:', error);
    throw error;
  }
};

// Function to withdraw staked amount
export const withdraw = async () => {
  try {
    const stakingContract = await getStakingContract();
    console.log('Staking contract:', stakingContract);

    const signerAddress = await (await getSigner()).getAddress();
    console.log('Signer address:', signerAddress);

    const txResponse = await stakingContract.withdraw();
    console.log('TX response:', txResponse);
    await txResponse.wait();
  } catch (error) {
    console.error('Failed to withdraw:', error);
    throw error;
  }
};

// Export the contract instances and balance functions
export { getStakingContract, getLiquidityPoolContract };