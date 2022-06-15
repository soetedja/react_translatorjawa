import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { clearErrors } from '../actions/baseActions';
import isEmpty from '../validation/is-empty';

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.props.clearErrors();

    this.state = {};
  }

  onDismiss = idx => {
    this.props.clearErrors(idx);
  };

  render() {
    if (
      Array.isArray(this.props.message.messages) &&
      this.props.message.messages.length > 0
    ) {
      return this.props.message.messages.map((alert, index) => (
        <Alert
          key={index}
          color={alert.type || 'danger'}
          isOpen={true} //{this.state.visible}
          toggle={() => this.onDismiss(index)}
        >
          <strong>{alert.model}: </strong>
          {alert.message}
        </Alert>
      ));
    } else if (!isEmpty(this.props.message.messages)) {
      return (
        <Alert color='danger' isOpen={true} toggle={this.onDismiss}>
          <h4>
            {this.props.message.status} - {this.props.message.code}
          </h4>
          <div>{this.props.message.messages}</div>
        </Alert>
      );
    } else if (
      typeof this.props.message.data === 'object' &&
      this.props.message.data !== null
    ) {
      return (
        <Alert color='danger' isOpen={true} toggle={this.onDismiss}>
          <h4>
            {this.props.message.status} - {this.props.message.statusText}
          </h4>
          <div>{this.props.message.data.messages}</div>
        </Alert>
      );
    }
    return <span></span>;
  }
}

Alerts.propTypes = {
  message: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const mapStateToProps = state => ({
  message: state.message
});

export default connect(
  mapStateToProps,
  { clearErrors }
)(Alerts);
