const { assert } = require("console");

const CrowdFundFactory = artifacts.require("CrowdFundFactory");
const CrowdFund = artifacts.require("CrowdFund");
const { expectRevert } = require("@openzeppelin/test-helpers");

contract("Crowd Fund Factory Testing", async (accounts) => {
  let crowdFundFactory;
  let crowdFund;

  it("New Fund Factory is creating", async () => {
    crowdFundFactory = await CrowdFundFactory.new();
    // assert.ok(crowdFundFactory);
  });
  it("New Fund is creating", async () => {
    await crowdFundFactory.createNewFund(100, 2, 10, "Cancer", "image.png");
    crowdFund = await crowdFundFactory.getParticularFund(0);
  });
  it("New Fund constructor working properly", async () => {
    crowdFund = await CrowdFund.new(
      100,
      2,
      10,
      "Cancer",
      "image.png",
      accounts[0],
    );
    const description = await crowdFund.description();
    const minimumDonation = (await crowdFund.minimumDonation()).toNumber();
    const seeker = await crowdFund.seeker();
    assert(
      description === "Cancer" &&
        minimumDonation === 100 &&
        seeker === accounts[0],
    );
  });
  it("Getting Contract Balance, working properly", async () => {
    const balance = (await crowdFund.getContractBalance()).toNumber();
    assert(balance === 0);
  });
  it("Sending Donation, working properly", async () => {
    await crowdFund.sendDonation({ from: accounts[1], value: 100 });
    const balance = (await crowdFund.getContractBalance()).toNumber();
    assert(balance === 100);
  });
  it("Sending Donation, can not be possible if donation is not met the minimum requirement", async () => {
    try {
      await crowdFund.sendDonation({ from: accounts[1], value: 10 });
    } catch (e) {
      assert(e.reason === "Minimum Donation is not met");
    }
  });
  it("Accepting Donation is not possible if msg.sender is not seeker", async () => {
    try {
      await crowdFund.acceptDonation({ from: accounts[1] });
    } catch (e) {
      assert(e.reason === "You are not the authorised person");
    }
  });
  it("Accepting Donation is not possible if deadline is not crossed", async () => {
    try {
      await crowdFund.acceptDonation({ from: accounts[0] });
    } catch (e) {
      assert(e.reason === "Deadline is not passes");
    }
  });
  it("Demand Refund is not possible if msg.sender is not contributor", async () => {
    try {
      await crowdFund.demandRefund({ from: accounts[2] });
    } catch (e) {
      assert(e.reason === "You are not a contributor");
    }
  });
  it("Demand Refund is not possible if deadline is not crossed", async () => {
    try {
      await crowdFund.demandRefund({ from: accounts[1] });
    } catch (e) {
      assert(
        e.reason ===
          "Either deadline is not pass or collected amount met the target",
      );
    }
  });
});
