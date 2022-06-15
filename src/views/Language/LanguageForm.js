import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import AutoGenerateForm from '../../components/AutoGenerateForm';
import { get, add, edit, clear } from '../../actions/languageActions';
import { clearErrors } from '../../actions/baseActions';

class LanguageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: '',
      formErrors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.language !== state.language) {
      return {
        language: props.language
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
      name: 'code',
      type: 'text',
      label: 'Code',
      placeholder: 'Enter code...'
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
              name='Language'
              entity={this.state.language}
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

LanguageForm.propTypes = {
  get: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
  allLanguages: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  language: state.language.current,
  message: state.message,
  allLanguages: state.language.all,
  allStatuses: state.status.all
});

LanguageForm.defaultProps = { allLanguages: [], allStatuses: [] };

export default connect(
  mapStateToProps,
  { get, add, edit, clear, clearErrors }
)(LanguageForm);
