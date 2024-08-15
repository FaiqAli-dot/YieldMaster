import React, { useState } from "react";
import { getStakingContract } from "./blockchain";
import { ethers } from "ethers";

const Dashboard: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [stakeResult, setStakeResult] = useState<string>("");
  const [withdrawResult, setWithdrawResult] = useState<string>("");

  const stakeEther = async () => {
    try {
      const stakingContract = await getStakingContract();
      const tx = await stakingContract.stake({
        value: ethers.parseEther(stakeAmount),
      });
      await tx.wait();
      setStakeResult("Staked successfully!");
    } catch (error) {
      setStakeResult("Failed to stake: " + (error as Error).message);
    }
  };

  const withdrawStake = async () => {
    try {
      const stakingContract = await getStakingContract();
      const tx = await stakingContract.withdraw();
      await tx.wait();
      setWithdrawResult("Withdrawal successful!");
    } catch (error) {
      setWithdrawResult("Failed to withdraw: " + (error as Error).message);
    }
  };

  return (
    <div>
      <h1>YieldMaster Dashboard</h1>
      <div>
        <input
          type="text"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder="Amount to Stake (ETH)"
        />
        <button onClick={stakeEther}>Stake</button>
        <p>{stakeResult}</p>
      </div>
      <div>
        <button onClick={withdrawStake}>Withdraw Stake</button>
        <p>{withdrawResult}</p>
      </div>
    </div>
  );
};

export default Dashboard;