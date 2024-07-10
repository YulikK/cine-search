import React, { ReactNode } from 'react';

export class ErrorGenerator extends React.Component {
  state = {
    throwError: false,
  };

  generateError = (): void => {
    this.setState({ throwError: true });
  };

  render(): ReactNode {
    if (this.state.throwError) {
      throw new Error('This is a test error');
    }

    return (
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        onClick={this.generateError}
      >
        Generate Error
      </button>
    );
  }
}
