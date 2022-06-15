import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import AutoGenerateForm from '../../components/AutoGenerateForm';
import {
  get,
  add,
  edit,
  clear,
  getAllSuggestionWord
} from '../../actions/wordActions';
import { clearErrors } from '../../actions/baseActions';

class WordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',
      formErrors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.word !== state.word && !state.changed) {
      return {
        word: props.word
      };
    } else if (state.changed) {
      return {
        word: state,
        changed: false
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

  getAllSuggestionWord = input => {
    if (this.state.word)
      return this.props.getAllSuggestionWord({
        value: input,
        lang: this.state.word.language_id
      });
  };

  onFieldChange = word => {
    this.setState({ ...word, changed: true });
  };

  onSubmit = obj => {
    if (obj.id) {
      this.props.edit(obj, this.props.history);
    } else {
      this.props.add(obj, this.props.history);
    }
  };

  fields = () => [
    {
      name: 'word',
      type: 'text',
      label: 'Word',
      required: true,
      placeholder: 'Enter word...'
    },
    {
      name: 'shown',
      type: 'text',
      label: 'Shown',
      placeholder: 'Enter shown...'
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
      name: 'word_root_id',
      labelOpt: 'word_root',
      type: 'async-select',
      asyncFunc: this.getAllSuggestionWord,
      label: 'Word Root',
      placeholder: 'Search word root...',
      defaultOptions: false,
      selectedValue: {
        value: this.state.word ? this.state.word.word_root_id : 0,
        label: this.state.word ? this.state.word.word_root : 0
      }
    },
    {
      name: 'is_on_dictionary',
      type: 'switch',
      label: 'Display On Dictionary'
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
      name: 'suffix',
      type: 'text',
      label: 'Suffix',
      placeholder: 'Enter suffix...'
    },
    {
      name: 'prefix',
      type: 'text',
      label: 'Prefix',
      placeholder: 'Enter prefix...'
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
            {this.state.word ? (
              <AutoGenerateForm
                name='Word'
                entity={this.state.word}
                fields={this.fields()}
                autoComplete='off'
                goBack={this.goBack}
                onSubmit={this.onSubmit}
                onFieldChange={this.onFieldChange}
                errors={this.props.message}
              />
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

WordForm.propTypes = {
  get: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  word: PropTypes.object.isRequired,
  allLanguages: PropTypes.array.isRequired,
  allStatuses: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  word: state.word.current,
  message: state.message,
  allLanguages: state.language.all,
  allStatuses: state.status.all,
  suggestionWords: state.word.suggestionWords
});

WordForm.defaultProps = { allLanguages: [], allStatuses: [] };

export default connect(
  mapStateToProps,
  { get, add, edit, clear, clearErrors, getAllSuggestionWord }
)(WordForm);
