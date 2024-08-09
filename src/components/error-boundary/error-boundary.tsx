import React, { Component, ReactNode } from 'react';
import { AlertIcon } from '../icons/alert-icon/alert-icon';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true, errorMessage: '' };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorMessage: error.toString() });
  }

  render(): ReactNode {
    const { hasError, errorMessage } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="mb-6 flex items-center justify-center bg-background">
          <div className="bg-red-500 text-red-50 p-6 rounded-2xl shadow-lg w-full max-w-md">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 rounded-full p-3 flex items-center justify-center">
                <AlertIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">
                  Oops, something went wrong!
                </h2>
                <p className="text-sm mt-1">{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}