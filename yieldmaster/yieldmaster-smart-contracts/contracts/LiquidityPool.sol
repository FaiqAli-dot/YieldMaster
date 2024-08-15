// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LiquidityPool {
    mapping(address => uint256) public poolBalance;

    function provideLiquidity() public payable {
        require(msg.value > 0, "Must provide liquidity");

        poolBalance[msg.sender] += msg.value;
    }

    function withdrawLiquidity(uint256 amount) public {
        require(poolBalance[msg.sender] >= amount, "Insufficient balance");

        poolBalance[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
