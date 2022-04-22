import React, { Component } from "react"

export default class RegisteringVotersInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: null, addVoterResult: "-", startRegisteringResult: "-" };
  }

  handleOnChangeVoterInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitVoter = async (e) => {
    e.preventDefault();

    // Needed to keep the correct 'this' in promises
    const component = this;

    await this.props.contract.methods.addVoter(this.state.inputValue).send({ from: this.props.account })
      .once('transactionHash', function (hash) {
        console.log('Transaction sent with hash: ' + hash);
      })
      .on('error', function (error) {
        component.setState({ addVoterResult: error.message });
      })
      .then(function (receipt) {
        // will be fired once the receipt is mined
        let addedVoterAddress = receipt.events.VoterRegistered.returnValues.voterAddress;
        component.setState({ addVoterResult: addedVoterAddress + " has been added as a voter!" });
      });
  }

  handleSubmitWorkflowChange = async (e) => {
    e.preventDefault();

    // Needed to keep the correct 'this' in promises
    const component = this;

    await this.props.contract.methods.startProposalsRegistering().send({ from: this.props.account })
      .once('transactionHash', function (hash) {
        console.log('Transaction sent with hash: ' + hash);
      })
      .on('error', function (error) {
        component.setState({ startRegisteringResult: error.message });
      })
      .then(function (receipt) {
        // will be fired once the receipt is mined
        component.setState({ startRegisteringResult: "Voting contract is now in proposal registering started state" });
      });
  }

  render() {

    return (
      <div>
        <h4>{this.props.contractStatus}</h4>
        <p>{this.props.description}</p>
        <form onSubmit={this.handleSubmitVoter} className="form">
          <label htmlFor="voterAddress">Voter address: </label>
          <input id="voterAddress" type="text" name='inputValue' onChange={this.handleOnChangeVoterInput} pattern="^0x[a-fA-F0-9]{40}$" className="input" />
          <input type="submit" value="Add voter" className="button" />
        </form>
        <p>Add voter interaction result: {this.state.addVoterResult}</p>
        <form onSubmit={this.handleSubmitWorkflowChange} className="form">
          <input type="submit" value="Start proposal registering" className="button" />
        </form>
        <p>Start proposal registering interaction result: {this.state.startRegisteringResult}</p>
      </div>
    )
  }
}