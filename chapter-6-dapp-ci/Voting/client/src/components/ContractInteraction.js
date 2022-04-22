import React from 'react';
import ProposalRegistrationStartedInteraction from './Interactions/ProposalsRegistrationStartedInteraction';
import RegisteringVotersInteraction from './Interactions/RegisteringVotersInteraction';
import ProposalsRegistrationEndedInteraction from './Interactions/ProposalsRegistrationEndedInteraction';
import VotesTalliedInteraction from './Interactions/VotesTalliedInteraction';
import VotingSessionEndedInteraction from './Interactions/VotingSessionEndedInteraction';
import VotingSessionStartedInteraction from './Interactions/VotingSessionStartedInteraction';

const workflowStatusString = [
  'RegisteringVoters',
  'ProposalsRegistrationStarted',
  'ProposalsRegistrationEnded',
  'VotingSessionStarted',
  'VotingSessionEnded',
  'VotesTallied',
];

const infoString = [
  'Le owner du contrat peut enregistrer des voteurs.',
  'Les voteurs enregistrés peuvent ajouter des propositions.',
  'Les ajouts de propositions sont terminés.',
  'La session de vote a démarré.',
  'La session de vote est terminé.',
  'Les votes ont étés comptabilisés.',
];

export default class ContractInteraction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const InteractionComponent = () => {
      switch (Number(this.props.workflowStatus)) {
        case 0:
          return (
            <RegisteringVotersInteraction
              account={this.props.account}
              contract={this.props.contract}
              contractStatus={workflowStatusString[this.props.workflowStatus]}
              description={infoString[this.props.workflowStatus]}
            />
          );
        case 1:
          return (
            <ProposalRegistrationStartedInteraction
              account={this.props.account}
              contract={this.props.contract}
              contractStatus={workflowStatusString[this.props.workflowStatus]}
              description={infoString[this.props.workflowStatus]}
            />
          );
        case 2:
          return <ProposalsRegistrationEndedInteraction />;
        case 3:
          return <VotingSessionStartedInteraction />;
        case 4:
          return <VotingSessionEndedInteraction />;
        case 5:
          return <VotesTalliedInteraction />;
        default:
          console.log('Workflow status: ' + this.props.workflowStatus);
          return <p>Unknown workflow status!</p>;
      }
    };

    return (
      <div style={{ border: '1px solid black' }}>
        <InteractionComponent />
      </div>
    );
  }
}
