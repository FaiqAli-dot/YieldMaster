// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public stakingTime;

    uint256 public rewardRate = 100; // Example reward rate

    constructor() {
        // Simple constructor to see if initialization is the issue
    }

    function stake() public payable {
        require(msg.value > 0, "Cannot stake 0");

        balances[msg.sender] += msg.value;
        stakingTime[msg.sender] = block.timestamp;
    }

    function calculateReward(address staker) public view returns (uint256) {
        uint256 stakedTime = block.timestamp - stakingTime[staker];
        return (balances[staker] * stakedTime * rewardRate) / 1000000;
    }

    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }

    function withdraw() public {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "Insufficient balance");

        uint256 reward = calculateReward(msg.sender);
        uint256 totalAmount = balance + reward;

        balances[msg.sender] = 0;
        stakingTime[msg.sender] = 0;

        payable(msg.sender).transfer(totalAmount);
    }
}
