import { Col, Modal } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { toggleSignInModal } from "../actions/appActions";
import { signInAsGuest } from "../actions/authActions";
import { clearErrors } from "../actions/baseActions";
import { GUEST_USER_ID } from "../constants";

class AccessControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayed: false
    };
  }

  componentWillUnmount() {}

  onOk = () => {
    this.setState({ displayed: false });
    this.props.clearErrors();
    this.props.history.push("/login");
  };
  onCancel = () => {
    this.setState({ displayed: false });
    this.props.clearErrors();
  };

  error = () => {
    Modal.confirm({
      onOk: this.onOk,
      onCancel: this.onCancel,
      title: "Akses tidak diijinkan",
      icon: "close",
      content:
        "Anda tidak memiliki akses untuk menggunakan fitur ini. Silahkan login terlebih dahulu.",
      okText: "Ke Halaman Login",
      cancelText: "Tutup"
    });
  };

  componentDidUpdate() {
    if (
      GUEST_USER_ID === this.props.user.id &&
      this.props.message.code === 401
    ) {
      if (!this.state.displayed) {
        this.setState({ displayed: true });
        this.error();
      }
    } else {
      //this.props.signInAsGuest();
      // var user = JSON.parse(localStorage.user);
      // if (!user) {
      // } 
    }

    // for (var item of this.props.messages) {
    //   if (GUEST_USER_ID === this.props.user.id && item.code === 401) {
    //     if (!this.state.displayed) {
    //       this.setState({ displayed: true });
    //       this.error();
    //     }
    //   }
    // }
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

AccessControl.propTypes = {
  message: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const mapStateToProps = state => ({
  message: state.message,
  app: state.app,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  clearErrors,
  toggleSignInModal,
  signInAsGuest
})(withRouter(AccessControl));
