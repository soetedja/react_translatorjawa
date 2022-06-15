import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import { getSuggestionWord } from '../actions/wordActions';

class DictionarySearch extends React.Component {
  initSelectedValue = { value: 0, label: '' };
  constructor(props) {
    super(props);
    this.state = {};
    const wait = 500; // milliseconds
    this.debouncedLoadOptions = _.debounce(this.loadOptions, wait);
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (
  //     props.id !== state.prevKeyId &&
  //     props.selectedValue.value &&
  //     props.selectedValue.value !== state.selectedValue.value
  //   ) {
  //     return {
  //       selectedValue: props.selectedValue,
  //       prevKeyId: props.id
  //     };
  //   } else if (state.selectedValue.label) {
  //     return {
  //       selectedValue: state.selectedValue
  //     };
  //   }
  //   return null;
  // }

  // componentWillUnmount() {
  //   this.setState({ selectedValue: this.initSelectedValue });
  // }

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
    this.props.onSelect(value);
  };

  getAsyncOptions = inputValue => {
    return this.props.getSuggestionWord(inputValue, 0).then(res => {
      if (res) {
        let ops = res.map(category => ({
          value: category.id,
          label: `${category.word} - ${category.language_name}`
        }));
        return ops;
      }
    });
  };

  colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: isDisabled ? 'white' : 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? data.color : '#ddd')
        }
      };
    }
    // input: styles => ({ ...styles, ...dot() }),
    // placeholder: styles => ({ ...styles, ...dot() }),
    // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
  };

  render() {
    return (
      <AsyncSelect
        cacheOptions
        {...this.state.defaultOptionsAttr}
        loadOptions={(inputValue, callback) =>
          this.debouncedLoadOptions(inputValue, callback)
        }
        name='dictionary-search'
        value={this.state.selectedValue || { value: 0, label: '' }}
        placeholder='Cari kata...'
        id='dictionary-search'
        onInputChange={this.handleInputChange}
        onChange={this.handleChange(this.props.name)}
        styles={this.colourStyles}
      />
    );
  }
}

DictionarySearch.propTypes = {};

DictionarySearch.defaultProps = {};

// export default React.memo(DictionarySearch);

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { getSuggestionWord }
)(DictionarySearch);
