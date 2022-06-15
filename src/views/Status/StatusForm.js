import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import AutoGenerateForm from '../../components/AutoGenerateForm';
import { get, add, edit, clear } from '../../actions/statusActions';
import { clearErrors } from '../../actions/baseActions';

class StatusForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      formErrors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.status !== state.status) {
      return {
        status: props.status
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
      name: 'type',
      type: 'text',
      label: 'Type',
      required: true,
      placeholder: 'Enter type...'
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
              name='Status'
              entity={this.state.status}
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

StatusForm.propTypes = {
  get: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  allStatuss: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  status: state.status.current,
  message: state.message,
  allStatuss: state.status.all,
  allStatuses: state.status.all
});

StatusForm.defaultProps = { allStatuss: [], allStatuses: [] };

export default connect(
  mapStateToProps,
  { get, add, edit, clear, clearErrors }
)(StatusForm);
