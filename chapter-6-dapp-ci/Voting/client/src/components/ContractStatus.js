import React from 'react';

export default class ContractStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let workflowStatusString = ["RegisteringVoters",
            "ProposalsRegistrationStarted",
            "ProposalsRegistrationEnded",
            "VotingSessionStarted",
            "VotingSessionEnded",
            "VotesTallied"];
        return(
            <div>
                
                <h3>Contract address: {this.props.contractAddress}</h3>
                <h3>Contract status: {workflowStatusString[this.props.workflowStatus]}</h3>
            </div>
        )
    }
}