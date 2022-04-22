import React from 'react';

export default class HelloUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h2>Hello {this.props.addr} !</h2>
      // voter / owner / no status <h3></h3>
    );
  }
}
