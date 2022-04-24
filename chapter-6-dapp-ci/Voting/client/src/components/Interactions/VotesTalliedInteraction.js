import React, { Component } from "react"

export default class VotesTalliedInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = { winningProposalId: null };
  }



  render() {
    return (
      <div>
        <h4>{this.props.contractStatus}</h4>
        <p>{this.props.description}</p>
        <p>The winning proposal is {this.state.winningProposalId == null ? '...' : this.state.winningProposalId}</p>
      </div>
    );
  }

}