const Staking = artifacts.require("Staking");
const LiquidityPool = artifacts.require("LiquidityPool");

module.exports = function (deployer) {
  console.log("Starting deployment...");
  
  deployer.deploy(LiquidityPool)
  deployer.deploy(Staking)
    .then(() => {
      console.log("Deployment successful");
    })
    .catch(error => {
      console.error("Deployment failed:", error);
    });
};
