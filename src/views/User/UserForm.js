import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import AutoGenerateForm from '../../components/AutoGenerateForm';
import { get, add, edit, clear } from '../../actions/userActions';
import { clearErrors } from '../../actions/baseActions';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      formErrors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user) {
      return {
        user: props.user
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
      name: 'username',
      type: 'text',
      label: 'Username',
      required: true,
      placeholder: 'Enter username...'
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter name...'
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter email...'
    },
    {
      name: 'email_verified',
      type: 'switch',
      label: 'Email Verified'
    },
    {
      name: 'language_id',
      type: 'select',
      label: 'Language',
      placeholder: 'Enter language...',
      options: this.props.allLanguages.map(item => {
        return { label: item.name, value: item.id };
      })
    },
    {
      name: 'status_id',
      type: 'select',
      label: 'Status',
      placeholder: 'Enter status...',
      options: this.props.allStatuses.map(item => {
        return { label: item.name, value: item.id };
      })
    },
    {
      name: 'oauth_id',
      type: 'text',
      label: 'Oauth ID',
      placeholder: 'Enter oauth_id...'
    },
    {
      name: 'oauth_provider',
      type: 'text',
      label: 'Oauth Provider',
      placeholder: 'Enter oauth_provider...'
    },
    {
      name: 'locale',
      type: 'text',
      label: 'Locale',
      placeholder: 'Enter locale...'
    },
    {
      name: 'level',
      type: 'text',
      label: 'Level',
      placeholder: 'Enter level...'
    },
    {
      name: 'authorised',
      type: 'switch',
      label: 'Authorised'
    },
    {
      name: 'block_expires',
      type: 'text',
      label: 'Block Expires'
    },
    {
      name: 'login_attempts',
      type: 'text',
      label: 'Login Attempts'
    }
  ];

  render() {
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' md='12'>
            <AutoGenerateForm
              name='User'
              entity={this.state.user}
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

UserForm.propTypes = {
  get: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  allLanguages: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  user: state.user.current,
  message: state.message,
  allLanguages: state.language.all,
  allStatuses: state.status.all
});

UserForm.defaultProps = { allLanguages: [], allStatuses: [] };

export default connect(
  mapStateToProps,
  { get, add, edit, clear, clearErrors }
)(UserForm);
