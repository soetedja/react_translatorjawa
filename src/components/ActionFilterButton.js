import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class ActionFilterButton extends Component {
  static propTypes = {
    onFilter: PropTypes.func.isRequired
  };
  filter = () => {
    this.props.onFilter();
  };
  render() {
    return [
      <label key='action' className='filter-label'>
        <Button
          color='success'
          className='btn btn-md btn-block filter '
          onClick={this.filter}
        >
          <i className='fa fa-save'></i> &nbsp; Add
        </Button>
      </label>
    ];
  }
}

export default ActionFilterButton;
