import "./App.css";
import React from "react";
// import { ethers } from "ethers";
// import CrowdFund from "././contracts/CrowdFund.json";
// import CrowdFundFactory from "././contracts/CrowdFundFactory.json";
import { Home } from "./components/Home";

function App() {
  console.log(process.env.REACT_APP_IMGUR_CLIENT_ID);
  // const factoryAbi = CrowdFundFactory.abi;
  // const fundAbi = CrowdFund.abi;

  // const factoryAddress = CrowdFundFactory.networks["5777"].address;
  // let fundAddress;

  // let factoryInstance;
  // let fundInstance;

  // const connectFactory = async () => {
  //   provider = new ethers.providers.Web3Provider(window.ethereum);
  //   factoryInstance = new ethers.Contract(
  //     factoryAddress,
  //     factoryAbi,
  //     provider.getSigner(),
  //   );
  // };

  // const connectFund = async (_address) => {
  //   provider = new ethers.providers.Web3Provider(window.ethereum);
  //   fundInstance = new ethers.Contract(_address, fundAbi, provider.getSigner());
  // };

  // const connectToDatabase = async () => {
  //   // console.log(address, abi);
  //   if (window.ethereum) {
  //     await connectFactory();
  //   } else {
  //     alert("Please connect to MetaMask");
  //   }
  // };

  // const accessCrowdFund = async (_address) => {
  //   await connectFund(_address);
  //   console.log(fundInstance);
  //   console.log((await fundInstance.value()).toNumber());

  //   const targetFund = await fundInstance.targetFund();
  //   console.log(targetFund.toNumber());
  // };

  /*

  const handleOperations = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const factoryInstance = new ethers.Contract(
        factoryAddress,
        factoryAbi,
        provider.getSigner(),
      );
      console.log(factoryInstance);
      console.log((await factoryInstance.val()).toNumber());

      // let transaction;
      // transaction =
      await factoryInstance.createNewFund(
        100,
        5,
        1000000,
        "cancer",
        "image.png",
      );
      // await transaction.wait();
      const fundAddress1 = await factoryInstance.getParticularFund(0);
      console.log(fundAddress1);
      console.log(await factoryInstance.crowdFundList(1));

      const fundInstance = new ethers.Contract(
        fundAddress1,
        fundAbi,
        provider.getSigner(),
      );
      console.log((await fundInstance.targetFund()).toNumber());
    } else {
      alert("Please connect to MetaMask");
    }
  };
*/
  // React.useEffect(() => connectToDatabase(), []);
  // React.useEffect(() => handleOperations(), []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
