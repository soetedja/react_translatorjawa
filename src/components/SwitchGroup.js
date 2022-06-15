import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Label } from 'reactstrap';
import { FormErrorMessage } from './FormErrorMessage';
import isEmpty from '../validation/is-empty';
import { AppSwitch } from '@coreui/react';

class SwitchGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: [],
      validationAttr: {},
      value: '',
      options: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== '' && state.value === '') {
      return {
        value: props.value,
        checked: props.value === '1' ? { checked: true } : {}
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  handleChange = e => {
    let toggleVal = this.state.value === '1' ? '0' : '1';
    this.setState({
      value: toggleVal,
      checked: toggleVal === '1' ? { checked: true } : {}
    });
    let name = e.target.name;
    this.setState(this._validateField(name, toggleVal, e), () =>
      this.props.onChange(
        this.props.id,
        this.state.value,
        this.state.formErrors
      )
    );
  };

  _validateField = (fieldName, value, e) => {
    let required = e.target.hasAttribute('required');

    let fieldValidationErrors = [];

    if (required && isEmpty(value)) {
      fieldValidationErrors.push(this.props.label + ' is required');
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
      <Col xs='12' sm='12' md='6'>
        <FormGroup>
          <Col xs='12'>
            <Label htmlFor={this.props.name}>{this.props.label}</Label>
          </Col>
          <Col xs='12' sm='12'>
            <AppSwitch
              className={'mx-1'}
              variant={'3d'}
              color={'primary'}
              label
              dataOn={'\u2713'}
              dataOff={'\u2715'}
              name={this.props.name}
              value={this.state.value || '0'}
              {...(this.props.required
                ? { required: true }
                : { required: false })}
              {...this.state.checked}
              id={this.props.name}
              onChange={this.handleChange}
            />

            <FormErrorMessage formErrors={this.state.formErrors} />
          </Col>
        </FormGroup>
      </Col>
    );
  }
}

SwitchGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

SwitchGroup.defaultProps = {};

export default React.memo(SwitchGroup);
