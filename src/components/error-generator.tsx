import React from 'react';

class ErrorGenerator extends React.Component {
  state = {
    throwError: false,
  };

  generateError = () => {
    this.setState({ throwError: true });
  };

  render() {
    console.log('render');
    if (this.state.throwError) {
      throw new Error('This is a test error');
    }

    return <button onClick={this.generateError}>Generate Error</button>;
  }
}

export default ErrorGenerator;
