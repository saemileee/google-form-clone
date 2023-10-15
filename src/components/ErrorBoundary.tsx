import {Component, ReactNode} from 'react';
import {formBuilderStateStorage, formResultStateStorage} from '../store/localStorage';
import NotFound from '../containers/NotFound';

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

  componentDidCatch(error: Error) {
    console.error(error);
    this.setState({hasError: true});
    formBuilderStateStorage.setItem('');
    formResultStateStorage.setItem('');
  }

  render() {
    if (this.state.hasError) {
      return <NotFound />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
