import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { selectOption } from '../actions/translateActions';

class TranslationResult extends Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      // popoverOpen: new Array(0).fill(false),
      wordEdit: [],
      html: 'Saran...'
      // active: new Array(this.props.languages.length).fill(false)
    };
  }
  // toggle = (id, toggle = true) => {
  //   if (toggle) {
  //     this.setState({
  //       popoverOpen: {
  //         ...this.state.popoverOpen,
  //         [id]: !this.state.popoverOpen[id]
  //       }
  //     });
  //   }
  // };

  selectPopover = (id, key) => {
    // this.toggle(id);
    this.props.selectOption(id, key);
  };

  renderPopOver = (arr, id) => {
    return arr.map((val, key) => {
      return (
        <Button
          key={key}
          color='light'
          onClick={() => this.selectPopover(id, key)}
          block
          className='alternative py-0'
        >
          {val.result}
        </Button>
      );
    });
  };

  handleInputOnChange = (e, id) => {
    // let name = e.target.name;
    const value = e.target.value;
    this.setState({
      wordEditId: {
        id,
        value
      }
    });
  };

  handleChange = evt => {
    this.setState({ html: evt.target.value });
  };

  renderWord = id => {
    return (
      <Button
        color='link'
        className='translation-result'
        onClick={() => {
          // this.toggle(id);
          this.setState({
            html: this.props.result.advanced[id][0].result
          });
        }}
        id={'Popover-' + id}
      >
        {this.props.result.advanced[id][0].result}
      </Button>
    );
  };

  renderResult = () => {
    return this.props.result.advanced.map((val, id) => {
      return (
        <span key={id} style={{ marginRight: '1px' }}>
          {this.renderWord(id)}
          {!val[0].result.toString().match(/\n/) ? '' : <br />}
          <UncontrolledPopover
            className='popover-result'
            placement='bottom'
            // isOpen={this.state.popoverOpen[id]}
            target={'Popover-' + id}
            // toggle={() => {
            //   this.toggle(id, false);
            // }}
            trigger='focus'
            // delay={0}
          >
            <PopoverBody>{this.renderPopOver(val, id)}</PopoverBody>
          </UncontrolledPopover>
        </span>
      );
      // }
    });
  };

  render() {
    return <Col className='pl-3'>{this.renderResult()}</Col>;
  }
}

TranslationResult.propTypes = {
  result: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  result: state.translate.result
});

TranslationResult.defaultProps = {
  // selected: new Array(4).fill(false)
};

export default connect(
  mapStateToProps,
  { selectOption }
)(TranslationResult);
