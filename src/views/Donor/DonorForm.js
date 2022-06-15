import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import AutoGenerateForm from '../../components/AutoGenerateForm';
import { get, add, edit, clear } from '../../actions/donorActions';
import { clearErrors } from '../../actions/baseActions';

class DonorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donor: '',
      formErrors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.donor !== state.donor) {
      return {
        donor: props.donor
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  goBack = () => {
    this.props.history.goBack();
    this.props.clearErrors();
    this.props.clear();
  };

  componentDidMount() {
    if (Number.isInteger(parseInt(this.props.match.params.id))) {
      this.props.get(this.props.match.params.id);
    }
  }

  onSubmit = obj => {
    if (obj.id) {
      this.props.edit(obj, this.props.history);
    } else {
      this.props.add(obj, this.props.history);
    }
  };

  fields = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      placeholder: 'Enter name...'
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      placeholder: 'Enter email...'
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      required: true,
      placeholder: 'Enter phone...'
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Note',
      placeholder: 'Enter note...'
    }
  ];

  render() {
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' md='12'>
            <AutoGenerateForm
              name='Donor'
              entity={this.state.donor}
              fields={this.fields}
              autoComplete='off'
              goBack={this.goBack}
              onSubmit={this.onSubmit}
              errors={this.props.message}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

DonorForm.propTypes = {
  get: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  donor: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  donor: state.donor.current,
  message: state.message
});

export default connect(
  mapStateToProps,
  { get, add, edit, clear, clearErrors }
)(DonorForm);
