import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
import objectToArray from '../utils/objectToArray';

class ChooseLanguageButtonMobile extends Component {
  constructor(props) {
    super(props);
    let idSelected = this.props.selected.indexOf(true);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
      selected: this.props.languages[idSelected].name
    };
  }
  static getDerivedStateFromProps(props, state) {
    let idSelected = props.selected.indexOf(true);
    return {
      selected: props.languages[idSelected].name
    };
    // Return null to indicate no change to state.
    // return null;
  }

  toggle = i => {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
  };

  dropdownClicked = key => {
    let data = {
      ...new Array(this.props.languages.length).fill(false),
      [key]: true
    };
    let opts = objectToArray(data);
    this.props.onSelect(opts);
  };

  renderOptions = () => {
    return this.props.languages.map((val, key) => {
      if (key < 4)
        return (
          <DropdownItem key={key} onClick={() => this.dropdownClicked(key)}>
            {val.name}
          </DropdownItem>
        );
      else return null;
    });
  };

  render() {
    return (
      <ButtonDropdown
        style={{
          width: '100%'
        }}
        className='mr-1'
        isOpen={this.state.dropdownOpen[0]}
        toggle={() => {
          this.toggle(0);
        }}
      >
        <DropdownToggle caret color='primary'>
          {this.state.selected}
        </DropdownToggle>
        <DropdownMenu>
          {/* <DropdownItem header>Pilih bahasa</DropdownItem> */}
          {this.renderOptions()}
        </DropdownMenu>
      </ButtonDropdown>
      // <ButtonGroup className=' d-flex'>
      //   {this.renderButtons()}
      // </ButtonGroup>
    );
  }
}

ChooseLanguageButtonMobile.propTypes = {
  languages: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  languages: state.language.all
});

ChooseLanguageButtonMobile.defaultProps = {
  languages: []
};

export default connect(
  mapStateToProps,
  {}
)(ChooseLanguageButtonMobile);
