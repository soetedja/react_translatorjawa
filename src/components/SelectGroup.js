import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { Col, FormGroup, Label } from 'reactstrap';
import isEmpty from '../validation/is-empty';
import { FormErrorMessage } from './FormErrorMessage';

class SelectGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: [],
      validationAttr: {},
      value: '',
      selectedValue: '',
      options: []
    };
    if (props.asyncFunc) {
      const wait = 500; // milliseconds
      const loadOptions = inputValue => this.getAsyncOptions(inputValue);
      this.debouncedLoadOptions = _.debounce(loadOptions, wait);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value || props.options !== state.options) {
      let selectedValue = props.options.find(w => w.value === props.value);
      return {
        value: props.value,
        options: props.options,
        selectedValue
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  handleChange = name => selectedValue => {
    const { value } = selectedValue;
    this.setState({ value, selectedValue });
    this.setState(this._validateField(name, value), () =>
      this.props.onChange(this.props.id, value, this.state.formErrors)
    );
  };

  // handleChange = (value, e, f, g) => {

  //   let name = 'e.target.name';
  //   this.setState({ value });
  //   this.setState(this._validateField(name, value, e), () =>
  //     this.props.onChange(this.props.id, value, this.state.formErrors)
  //   );
  // };

  // handleChange = e => {
  //   let name = e.target.name;
  //   const value = e.target.value;
  //   this.setState({
  //     value
  //   });
  //   this.setState(this._validateField(name, value, e), () =>
  //     this.props.onChange(this.props.id, value, this.state.formErrors)
  //   );
  // };

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
    this.props.asyncFunc(inputValue);
  };

  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    // console.log('TCL: handleInputChange -> inputValue', inputValue);
    // this.props.asyncFunc(inputValue);
    return inputValue;
  };

  render() {
    return (
      <Col xs='12' sm='12' md='6'>
        <FormGroup>
          <Col xs='12'>
            <Label htmlFor={this.props.name}>{this.props.label}</Label>
          </Col>
          <Col xs='12' sm='12'>
            <Select
              name={this.props.name}
              value={this.state.selectedValue}
              onInputChange={this.handleInputChange}
              options={this.props.options}
              {...(this.props.required
                ? { required: true }
                : { required: false })}
              {...this.state.validationAttr}
              placeholder={this.props.placeholder}
              id={this.props.name}
              onChange={this.handleChange(this.props.name)}
            />
            {/* <Input
              type='select'
              name={this.props.name}
              value={this.state.value || ''}
              options={this.props.options}
              {...(this.props.required
                ? { required: true }
                : { required: false })}
              {...this.state.validationAttr}
              placeholder={this.props.placeholder}
              id={this.props.name}
              onChange={this.handleChange}
            >
              {selectOptions}
            </Input> */}
            <FormErrorMessage formErrors={this.state.formErrors} />
          </Col>
        </FormGroup>
      </Col>
    );
  }
}

SelectGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string
};

SelectGroup.defaultProps = {
  type: 'text'
};

export default React.memo(SelectGroup);
