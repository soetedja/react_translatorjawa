import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

class HTMLHead extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
    // onFilter: PropTypes.func.isRequired
  };
  render() {
    return (
      <Helmet>
        <meta charSet='utf-8' />
        <title>{this.props.title} - Mongosilakan</title>
        <link rel='canonical' href='https://mongosilakan.net/' />
      </Helmet>
    );
  }
}

export default HTMLHead;
