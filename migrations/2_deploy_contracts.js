const CrowdFundFactory = artifacts.require("CrowdFundFactory");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(CrowdFundFactory, { from: accounts[0] });
  await CrowdFundFactory.deployed();
  // await instance.createNewFund(100, 2, 1000000, "cancer", "image.png");
  // console.log(await instance.getParticularFund(0));
};
