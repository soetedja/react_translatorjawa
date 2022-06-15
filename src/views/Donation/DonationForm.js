import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import AutoGenerateForm from '../../components/AutoGenerateForm';
import { get, add, edit, clear } from '../../actions/donationActions';
import { clearErrors } from '../../actions/baseActions';

class DonationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donation: '',
      formErrors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.donation !== state.donation) {
      return {
        donation: props.donation
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
      name: 'donor_id',
      type: 'text',
      label: 'Donor ',
      required: true,
      placeholder: 'Enter donor...'
    },
    {
      name: 'method',
      type: 'text',
      label: 'Method',
      required: true,
      placeholder: 'Enter method...'
    },
    {
      name: 'amount',
      type: 'text',
      label: 'Amount',
      required: true,
      placeholder: 'Enter amount...'
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter description...'
    }
  ];

  render() {
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' md='12'>
            <AutoGenerateForm
              name='Donation'
              entity={this.state.donation}
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

DonationForm.propTypes = {
  get: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  donation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  donation: state.donation.current,
  message: state.message
});

export default connect(
  mapStateToProps,
  { get, add, edit, clear, clearErrors }
)(DonationForm);
