import { ethers } from 'ethers';
import Staking from '../yieldmaster-smart-contracts/build/contracts/Staking.json';
import LiquidityPool from '../yieldmaster-smart-contracts/build/contracts/LiquidityPool.json';

// Ensure TypeScript recognizes `window.ethereum`
declare global {
  interface Window {
    ethereum: any;
  }
}

const provider = new ethers.BrowserProvider(window.ethereum);
const getSigner = async () => await provider.getSigner();

const stakingAddress = "0x616889ac7960f3cD5FCDF057cd18fA3F838bfa16";
const liquidityPoolAddress = "0xD60A151623150A724790d377C21d0167f2b81d4e";

const getStakingContract = async () => new ethers.Contract(stakingAddress, Staking.abi, await getSigner());
const getLiquidityPoolContract = async () => new ethers.Contract(liquidityPoolAddress, LiquidityPool.abi, await getSigner());

export { getStakingContract, getLiquidityPoolContract };