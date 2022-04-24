import React from 'react';

export default class HelloUser extends React.Component {
  render() {
    return (
      <h2>Hello {this.props.addr} !</h2>
    );
  }
}
