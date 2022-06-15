import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import AutoGenerateForm from '../../components/AutoGenerateForm';
import HTMLHead from '../../components/HTMLHead';
import { get, add, edit, clear } from '../../actions/appSettingActions';
import { clearErrors } from '../../actions/baseActions';

class AppSettingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appSetting: '',
      formErrors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.appSetting !== state.appSetting) {
      return {
        appSetting: props.appSetting
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
      name: 'key',
      type: 'text',
      label: 'Key',
      required: true,
      placeholder: 'Enter key...'
    },
    {
      name: 'data_type',
      type: 'text',
      label: 'Data Type',
      required: true,
      placeholder: 'Enter data type...'
    },

    {
      name: 'value',
      type: 'text',
      label: 'Value',
      required: true,
      placeholder: 'Enter value...'
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
        <HTMLHead title='App Setting Form' />
        <Row>
          <Col xs='12' md='12'>
            <AutoGenerateForm
              name='AppSetting'
              entity={this.state.appSetting}
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

AppSettingForm.propTypes = {
  get: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  appSetting: PropTypes.object.isRequired,
  allAppSettings: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  appSetting: state.appSetting.current,
  message: state.message,
  allAppSettings: state.appSetting.all,
  allStatuses: state.status.all
});

AppSettingForm.defaultProps = { allAppSettings: [], allStatuses: [] };

export default connect(
  mapStateToProps,
  { get, add, edit, clear, clearErrors }
)(AppSettingForm);
