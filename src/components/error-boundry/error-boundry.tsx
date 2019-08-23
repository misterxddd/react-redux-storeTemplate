import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';

type PropTypes = {

}

type StateTypes = {
  hasError: boolean;
}

class ErrorBoundry extends Component<PropTypes, StateTypes> {

  state = {
    hasError: false
  }

  componentDidCatch() {
      this.setState({hasError : true});
  }

  render() {

    if(this.state.hasError) {
      return <ErrorIndicator />
    }

    return this.props.children;
  }
}

export default ErrorBoundry;