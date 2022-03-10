import React, { useState } from "react";
import { ethers } from "ethers";
import { NavBar } from "./NavBar";
import { Fund } from "./Fund";
import CrowdFundFactory from "../contracts/CrowdFundFactory.json";
import CrowdFund from "../contracts/CrowdFund.json";
import { DisplayFund } from "./DisplayFund";
import { LoadingIndicator } from "./LoadingIndicator";
import Grid from "@mui/material/Grid";

export const Home = () => {
  const [walletAddress, setwalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interactingToBlockChain, setInteractingToBlockChain] = useState(false);
  const [allFunds, setAllFunds] = useState([]);
  // const [getFundFlag, setGetFundFlag] = useState(1);
  let provider;

  const factoryAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const factoryAbi = CrowdFundFactory.abi;
  const fundAbi = CrowdFund.abi;

  const handleConnectToWallet = async () => {
    setIsLoading(true);
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setwalletAddress(await signer.getAddress());
    } else {
      alert("Please install MetaMask");
    }
    setIsLoading(false);
    getAllFunds();
  };

  const handleDisconnectToWallet = async () => {
    setwalletAddress("");
  };

  const createNewFund = async (request) => {
    const { description, targetFund, minimumDonation, deadline, image } =
      request;
    if (window.ethereum) {
      setInteractingToBlockChain(true);
      provider = new ethers.providers.Web3Provider(window.ethereum);
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const factoryInstance = new ethers.Contract(
        factoryAddress,
        factoryAbi,
        provider.getSigner(),
      );
      (
        await factoryInstance.createNewFund(
          minimumDonation,
          deadline,
          targetFund,
          description,
          image,
        )
      )
        .wait()
        .then(() => window.location.reload());
      console.log(factoryInstance);
      // getAllFunds();
      setInteractingToBlockChain(false);
    } else {
      alert("Please install MetaMask");
    }
  };

  const getAllFunds = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const factoryInstance = new ethers.Contract(
        factoryAddress,
        factoryAbi,
        signer,
      );

      const totalFundsCount = (
        await factoryInstance.crowdFundCount()
      ).toNumber();

      console.log(totalFundsCount);

      for (let i = 0; i < totalFundsCount; i++) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const fundAddress = await factoryInstance.getParticularFund(i);
        const fundInstance = new ethers.Contract(
          fundAddress,
          fundAbi,
          provider.getSigner(),
        );

        const noOfContributors = (
          await fundInstance.noOfContributors()
        ).toNumber();
        const seeker = await fundInstance.seeker();
        const minimumDonation = (
          await fundInstance.minimumDonation()
        ).toNumber();
        const deadline = (await fundInstance.deadline()).toNumber();
        console.log(deadline);
        const targetFund = (await fundInstance.targetFund()).toString();
        console.log(targetFund);
        const description = await fundInstance.description();
        const image = await fundInstance.image();
        const collectedAmount = (
          await fundInstance.collectedAmount()
        ).toNumber();

        const fundDetails = {
          address: fundAddress,
          noOfContributors: noOfContributors,
          seeker: seeker,
          minimumDonation: minimumDonation,
          deadline: deadline,
          targetFund: targetFund,
          description: description,
          image: image,
          collectedAmount: collectedAmount,
        };

        // console.log(totalFundsCount, fundAddress);
        setAllFunds((prev) => [...prev, fundDetails]);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  // useEffect(() => handleConnectToWallet(), []);
  // useEffect(() => getAllFunds(), []);
  // console.log("Wallet Address", walletAddress);
  console.log("All Fund Addresses", allFunds);

  return (
    <div>
      <NavBar
        walletAddress={walletAddress}
        isLoading={isLoading}
        handleDisconnectToWallet={handleDisconnectToWallet}
        handleConnectToWallet={handleConnectToWallet}
      />
      <Fund createNewFund={createNewFund} />
      {walletAddress === "" ? (
        <div>
          <h2>Please Login</h2>
        </div>
      ) : interactingToBlockChain ? (
        <LoadingIndicator />
      ) : allFunds.length === 0 ? (
        <div>
          <img src="./no_data_found.png" alt="No Display" />
        </div>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "50px",
            // border: "1px solid red",
            margin: "auto",
            maxWidth: "85%",
            marginBottom: "20px",
          }}
        >
          {allFunds.map((fund, index) => {
            return (
              <Grid key={index} container item xs={12} md={6}>
                <DisplayFund
                  fund={fund}
                  setInteractingToBlockChain={setInteractingToBlockChain}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};
