import React from 'react';

export default class ContractStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Contract address: {this.props.contractAddress}</h3>
        <h3>Contract owner: {this.props.contractOwner}</h3>
      </div>
    );
  }
}
