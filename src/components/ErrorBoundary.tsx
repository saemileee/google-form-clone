import React, {Component, ReactNode} from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  redirectToErrorPage: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      redirectToErrorPage: false,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({hasError: true});

    console.error('에러가 발생했습니다:', error, info);
  }

  render() {
    if (this.state.hasError) {
      window.location.href = '/';
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
