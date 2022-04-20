import React, { useEffect, useState, useRef } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import HelloUser from "./components/HelloUser";
import ContractStatus from "./components/ContractStatus";
import ContractInteraction from "./components/ContractInteraction";

function App() {
  const [state, setState] = useState({ isOwner: false, isVoter: false, web3: null, accounts: null, contract: null });
  const [contractState, setContractState] = useState({ workflowStatus: 0, 
                                                       events: { voterRegistered: [], workflowStatusChange: [], proposalRegistered: [], voted: []}
                                                      });
  // const inputRef = useRef();
  // const [setEventValue, setSetEventValue] = useState (0)
  
  useEffect(() => {
    (async function () {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        const instance = new web3.eth.Contract(
          VotingContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        //let value = await instance.methods.get().call();
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setState({ web3: web3, accounts: accounts, contract: instance });

        // await instance.events.dataStored()
        //   .on('data', event => {
        //     let value = event.returnValues.data;
        //     console.log(value);
        //     setSetEventValue(value);
        //   })
        //   .on('changed', changed => console.log(changed))
        //   // .on('error', err => throw err)
        //   .on('connected', str => console.log(str))

      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    })();
  }, [])

  // useEffect(()=> {
  //   setState(s => ({...s, storageValue: setEventValue}))
  // }, [setEventValue])

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { accounts, contract } = state;
  //   let value = inputRef.current.value.toUpperCase();
  //   await contract.methods.set(value).send({ from: accounts[0] });
  // }

  // const handleChange = (e) => {
  //   if (e.target.value < 0) {
  //     e.target.value = e.target.value.slice(0, 0);
  //   }
  // }

  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  } else {
    return (
      <div className="App">
        <h1>Alyra Voting DApp project</h1>
        <p>This simple React frontend is used to interact with the Voting smartcontract</p>
        <HelloUser addr={state.accounts[0]} />
        <ContractStatus workflowStatus={contractState.workflowStatus} contractAddress={state.contract.options.address} />
        <ContractInteraction workflowStatus={contractState.workflowStatus} />
        {/* {state.isOwner && 
          <h2></h2>
        } */}
      </div>
    );
  }

  // return (
  //   <div className="App">
  //     <h1>Good to Go!</h1>
  //     <p>Your Truffle Box is installed and ready.</p>
  //     <h2>Smart Contract Example</h2>
  //     <p>
  //       If your contracts compiled and migrated successfully, below will show
  //       a stored value of 5 (by default).
  //     </p>
  //     <p>
  //       Try changing the value stored on <strong>line 42</strong> of App.js.
  //     </p>
  //     <form onSubmit={handleSubmit} className="form">
  //       <label>
  //         <input type="text" ref={inputRef} onChange={handleChange} className="input" />
  //       </label>
  //       <input type="submit" value="Set" className="button" />
  //     </form>
  //     <div>The stored value is: {state.storageValue}</div>
  //   </div>
  // );
}
export default App;