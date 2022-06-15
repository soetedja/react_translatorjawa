import PropTypes from 'prop-types';
import React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import isEmpty from '../validation/is-empty';
import { FormErrorMessage } from './FormErrorMessage';

class InputGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formErrors: [], validationAttr: {}, value: undefined };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEmpty(props.value) && state.value !== props.value) {
      return {
        value:
          state.changedValue !== undefined ? state.changedValue : props.value
      };
    }
    if (props.alerts?.messages && props.alerts.messages.length > 0) {
      let alerts = props.alerts.messages.filter(
        alert => alert.id === props.name
      );
      if (
        alerts.messages &&
        alerts.messages.length > 0 &&
        state.changedValue === ''
      ) {
        return {
          formErrors: alerts.messages.map(alert => alert.message),
          validationAttr: { invalid: true }
        };
      }
    }
    // Return null to indicate no change to state.
    return null;
  }

  handleChange = e => {
    let name = e.target.name;
    const value = e.target.value;
    this.setState({
      value,
      changedValue: value
    });
    this.setState(this._validateField(name, value, e), () =>
      this.props.onChange(this.props.id, value, this.state.formErrors)
    );
  };

  _validateField = (fieldName, value, e) => {
    let required = e.target.hasAttribute('required');
    let email = e.target.getAttribute('type') === 'email';

    let fieldValidationErrors = [];
    let emailValid = true;

    if (required && isEmpty(value)) {
      fieldValidationErrors.push(this.props.label + ' is required');
    }

    if (email) {
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if (!emailValid) {
        fieldValidationErrors.push(this.props.label + ' is invalid');
      }
    }
    this.setState({ formErrors: fieldValidationErrors });

    let valid = true;
    if (fieldValidationErrors.length > 0) {
      valid = false;
    }
    this.setState({
      validationAttr: valid ? { valid: true } : { invalid: true }
    });
  };

  render() {
    return (
      <Col md={this.props.size || '6'}>
        <FormGroup>
          <Col xs='12'>
            <Label htmlFor={this.props.name}>{this.props.label}</Label>
          </Col>
          <Col xs='12' sm='12'>
            <Input
              type={this.props.type}
              name={this.props.name}
              value={this.state.value || ''}
              {...(this.props.required
                ? { required: true }
                : { required: false })}
              {...this.state.validationAttr}
              placeholder={this.props.placeholder}
              id={this.props.name}
              onChange={this.handleChange}
              autoComplete='off'
              rows={this.props.rows}
            />
            <FormErrorMessage formErrors={this.state.formErrors} />
          </Col>
        </FormGroup>
      </Col>
    );
  }
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string
};

InputGroup.defaultProps = {
  type: 'text'
};

export default React.memo(InputGroup);
