import { Col, message } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleSignInModal } from '../actions/appActions';
import { clearErrors } from '../actions/baseActions';

class MessageHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayed: false
    };
  }

  componentDidUpdate() {
    if (this.props.message.code !== 401) {
      if(typeof(this.props.message.messages) === 'string'){
        message.error(`${this.props.message.messages}`);
      } else {
        for (var item of this.props.message.messages.length) {
          console.log('TCL: MessageHandler -> componentDidUpdate -> item', item);
          switch (item.type) {
            case 'danger':
              message.error(`${item.message}`);
              break;
            case 'success':
              message.success(`${item.message}`);
              break;
            case 'warning':
              message.warning(`${item.message}`);
              break;
            case 'info':
            default:
              message.info(`${item.message}`);
              break;
          }
        }
      }
    }
  }

  render() {
    return (
      <Col>
        {/* <Modal
          title='Masuk / Daftar'
          centered
          visible={this.state.displayed}
          onOk={this.onOk}
          onCancel={this.onCancel}
          okText='Ke Halaman Login'
          cancelText='Tutup'
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal> */}
      </Col>
    );
  }
}

MessageHandler.propTypes = {
  message: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const mapStateToProps = state => ({
  message: state.message,
  app: state.app,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { clearErrors, toggleSignInModal }
)(withRouter(MessageHandler));
