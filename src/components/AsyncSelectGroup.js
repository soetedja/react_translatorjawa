import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Label } from 'reactstrap';
import { FormErrorMessage } from './FormErrorMessage';
import isEmpty from '../validation/is-empty';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';

class AsyncSelectGroup extends React.Component {
  initSelectedValue = { value: 0, label: '' };
  constructor(props) {
    super(props);
    this.state = {
      formErrors: [],
      selectedValue: this.initSelectedValue,
      inputValue: ''
    };
    const wait = 500; // milliseconds
    this.debouncedLoadOptions = _.debounce(this.loadOptions, wait);
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.id !== state.prevKeyId &&
      props.selectedValue.value &&
      props.selectedValue.value !== state.selectedValue.value
    ) {
      return {
        selectedValue: props.selectedValue,
        prevKeyId: props.id
      };
    } else if (state.selectedValue.label) {
      return {
        selectedValue: state.selectedValue
      };
    }
    return null;
  }

  componentWillUnmount() {
    this.setState({ selectedValue: this.initSelectedValue });
  }

  loadOptions = (inputValue, callback) => {
    if (inputValue) {
      this.getAsyncOptions(inputValue).then(results => callback(results));
    } else {
      this.getAsyncOptions(this.props.value).then(results => callback(results));
    }
    return;
  };

  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  handleChange = name => selectedValue => {
    let value = selectedValue ? selectedValue.value : '';
    this.setState({ selectedValue: selectedValue || this.initSelectedValue });
    this.setState(this._validateField(name, value), () =>
      this.props.onChange(this.props.id, value, this.state.formErrors)
    );
  };

  _validateField = (fieldName, value, e) => {
    let required = this.props.required;

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

  getAsyncOptions = inputValue => {
    return this.props.asyncFunc(inputValue).then(res => {
      if (res) {
        let ops = res.map(category => ({
          value: category.id,
          label: category.word
        }));
        return ops;
      }
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
            <AsyncSelect
              cacheOptions
              isClearable
              {...this.state.defaultOptionsAttr}
              loadOptions={(inputValue, callback) =>
                this.debouncedLoadOptions(inputValue, callback)
              }
              name={this.props.name}
              value={this.state.selectedValue || { value: 0, label: '' }}
              {...(this.props.required
                ? { required: true }
                : { required: false })}
              {...this.state.validationAttr}
              placeholder={this.props.placeholder}
              id={this.props.name}
              onInputChange={this.handleInputChange}
              onChange={this.handleChange(this.props.name)}
            />

            <FormErrorMessage formErrors={this.state.formErrors} />
          </Col>
        </FormGroup>
      </Col>
    );
  }
}

AsyncSelectGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string
};

AsyncSelectGroup.defaultProps = {};

export default React.memo(AsyncSelectGroup);
