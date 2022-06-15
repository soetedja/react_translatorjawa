import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  // ButtonDropdown,
  ButtonGroup,
  DropdownItem
  // DropdownMenu,
  // DropdownToggle
} from 'reactstrap';
import objectToArray from '../utils/objectToArray';

class ChooseLanguageButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: new Array(2).fill(false)
      // active: new Array(this.props.languages.length).fill(false)
    };
  }

  toggle = i => {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
    console.log(i);
  };

  btnOnClick = key => {
    let data = {
      ...new Array(this.props.languages.length).fill(false),
      [key]: true
    };
    let opts = objectToArray(data);
    this.props.onSelect(opts);
  };

  renderButtons = () =>
    this.props.languages.map((val, key) => {
      if (key < 4)
        return (
          <Button
            className={`${
              this.props.selected[key] ? 'active' : ''
            } language-button`}
            key={key}
            onClick={() => this.btnOnClick(key)}
            color='link'
          >
            {val.name}
          </Button>
        );
      else return null;
    });

  renderDropdownButtons = () =>
    this.props.languages.map((val, key) => {
      if (key > 3) return <DropdownItem key={key}>{val.name}</DropdownItem>;
      else return null;
    });

  render() {
    return (
      <ButtonGroup className=' d-flex'>
        {this.renderButtons()}
        {/* <Button className={`${this.state.active ? 'active' : ''}`}>
          Bahasa Indonesia
        </Button>
        <Button>Ngoko</Button> */}
        {/* <ButtonDropdown
          isOpen={this.state.dropdownOpen[1]}
          toggle={() => {
            this.toggle(1);
          }}
        >
          <DropdownToggle caret></DropdownToggle>
          <DropdownMenu>{this.renderDropdownButtons()}</DropdownMenu>
        </ButtonDropdown> */}
      </ButtonGroup>
    );
  }
}

ChooseLanguageButton.propTypes = {
  languages: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  // languages: state.language.all
});

ChooseLanguageButton.defaultProps = {
  languages: [],
  selected: []
};

export default connect(
  mapStateToProps,
  {}
)(ChooseLanguageButton);
