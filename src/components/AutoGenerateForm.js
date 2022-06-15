import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Card,
  FormGroup,
  CardBody,
  CardFooter,
  CardHeader
} from 'reactstrap';
import Alerts from './Alerts';
import InputGroup from './InputGroup';
import SelectGroup from './SelectGroup';
import SwitchGroup from './SwitchGroup';
import AsyncSelectGroup from './AsyncSelectGroup';

class AutoGenerateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {}, formValid: false, entity: {} };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      (Object.entries(state.entity).length === 0 ||
        state.entity !== props.entity) &&
      state.entity.constructor === Object
    ) {
      return {
        entity:
          state.changedValue !== undefined
            ? state.changedValue
            : props.entity || {}

        // formValid: true
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  handleFieldChange = (fieldId, value, errors) => {
    if (errors.length > 0) {
      this.setState(
        { errors: { ...this.state.errors, [fieldId]: errors } },
        () => this.validateForm()
      );
    } else {
      this.setState({ errors: { ...this.state.errors, [fieldId]: {} } }, () =>
        this.validateForm()
      );
    }
    let changedValue = { ...this.state.entity, [fieldId]: value };
    this.setState({ entity: changedValue, changedValue });
    this.props.onFieldChange(changedValue);
  };

  validateForm() {
    let valid = true;
    for (var error in this.state.errors) {
      if (Object.entries(this.state.errors[error]).length > 0) {
        valid = false;
      }
    }
    this.setState({ formValid: valid });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.entity);
  };

  render() {
    const fields = this.props.fields.map(field => {
      switch (field.type) {
        case 'text':
        case 'email':
        case 'textarea':
          return (
            <InputGroup
              alerts={this.props.errors}
              key={field.name}
              required={field.required}
              id={field.name}
              onChange={this.handleFieldChange}
              value={this.state.entity[field.name]}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
            />
          );
        case 'select':
          return (
            <SelectGroup
              key={field.name}
              asyncFunc={field.asyncFunc}
              options={field.options}
              required={field.required}
              id={field.name}
              onChange={this.handleFieldChange}
              value={this.state.entity[field.name]}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
            />
          );
        case 'async-select':
          return (
            <AsyncSelectGroup
              key={field.name}
              asyncFunc={field.asyncFunc}
              options={field.options}
              required={field.required}
              id={field.name}
              onChange={this.handleFieldChange}
              value={{
                word: this.state.entity[field.name],
                label: this.state.entity[field.labelOpt]
              }}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              defaultOptions={field.defaultOptions}
              selectedValue={field.selectedValue}
            />
          );
        case 'switch':
          return (
            <SwitchGroup
              key={field.name}
              options={field.options}
              required={field.required}
              id={field.name}
              onChange={this.handleFieldChange}
              value={
                this.state.entity[field.name]
                  ? this.state.entity[field.name].toString()
                  : ''
              }
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
            />
          );
        default:
          return '';
      }
    });

    return (
      <Form
        onSubmit={this.onSubmit}
        className='form-horizontal'
        autoComplete={this.props.autoComplete}
      >
        <Card>
          <CardHeader>
            <i className='fa fa-tasks'></i>
            <strong>{this.props.name} </strong> Form
          </CardHeader>
          <CardBody>
            <Alerts />
            <FormGroup row>{fields}</FormGroup>
          </CardBody>
          <CardFooter>
            <Button
              type='submit'
              size='sm'
              color='primary'
              disabled={!this.state.formValid}
            >
              <i className='fa fa-dot-circle-o'></i> Submit
            </Button>
            {/* <Button type='reset' size='sm' color='danger'>
              <i className='fa fa-ban'></i> Reset
            </Button> */}
            &nbsp; &nbsp;
            <Button color='light' size='sm' onClick={this.props.goBack}>
              <i className='fa fa-chevron-left'></i> Go Back
            </Button>
          </CardFooter>
        </Card>
      </Form>
    );
  }
}

AutoGenerateForm.propTypes = {
  goback: PropTypes.func,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

AutoGenerateForm.defaultProps = {};

export default React.memo(AutoGenerateForm);
