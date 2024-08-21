import React, { useState, useEffect } from "react";
import { getStakingBalance, getLiquidityPoolBalance, stake, withdraw } from "./blockchain";
import { ethers } from "ethers";

const Dashboard: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [stakeResult, setStakeResult] = useState<string>("");
  const [withdrawResult, setWithdrawResult] = useState<string>("");
  const [stakingBalance, setStakingBalance] = useState<string>("");
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState<string>("");
  const [stakedAmount, setStakedAmount] = useState<string>("");

  useEffect(() => {
    // Fetch the user's staking and liquidity pool balances when the component mounts
    const fetchBalances = async () => {
      const stakingBalance = await getStakingBalance();
      setStakingBalance(stakingBalance);

      const liquidityBalance = await getLiquidityPoolBalance();
      setLiquidityPoolBalance(liquidityBalance);

      const stakedAmount = await getStakedAmount();
      setStakedAmount(stakedAmount);
    };
    fetchBalances();
  }, []);

  const getStakedAmount = async () => {
    try {
      const amount = await getStakingBalance();
      return amount;
    } catch (error) {
      console.error('Failed to get staked amount:', error);
      return '0';
    }
  };

  const handleStake = async () => {
    try {
      await stake(stakeAmount);
      setStakeResult("Staked successfully!");

      // Update balances and staked amount after staking
      const stakingBalance = await getStakingBalance();
      setStakingBalance(stakingBalance);

      const liquidityBalance = await getLiquidityPoolBalance();
      setLiquidityPoolBalance(liquidityBalance);

      const stakedAmount = await getStakedAmount();
      setStakedAmount(stakedAmount);
    } catch (error) {
      setStakeResult("Failed to stake: " + (error as Error).message);
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdraw();
      setWithdrawResult("Withdrawal successful!");

      // Update balances and staked amount after withdrawal
      const stakingBalance = await getStakingBalance();
      setStakingBalance(stakingBalance);

      const liquidityBalance = await getLiquidityPoolBalance();
      setLiquidityPoolBalance(liquidityBalance);

      const stakedAmount = await getStakedAmount();
      setStakedAmount(stakedAmount);
    } catch (error) {
      setWithdrawResult("Failed to withdraw: " + (error as Error).message);
    }
  };

  return (
    <div>
      <h2>YieldMaster Dashboard</h2>
      <p>Your current staking balance: {stakingBalance} ETH</p>
      <p>Your current liquidity pool balance: {liquidityPoolBalance} ETH</p>
      <p>Your currently staked amount: {stakedAmount} ETH</p>
      <div>
        <input
          type="text"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder="Amount to Stake (ETH)"
        />
        <button onClick={handleStake}>Stake</button>
      </div>
      <div>
        <button onClick={handleWithdraw}>Withdraw Stake</button>
      </div>
      <p>{stakeResult}</p>
      <p>{withdrawResult}</p>
    </div>
  );
};

export default Dashboard;