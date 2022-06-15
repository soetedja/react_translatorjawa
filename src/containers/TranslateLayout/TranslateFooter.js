import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class TranslateFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <a href='https://mongosilakan.net'>Translator Jawa</a> &copy; 2019
          Mongosilakan
        </span>
        <Col className='text-right'>
          <span className='ml-3'>
            <Link to='/contact-us' className=''>
              Hubungi Kami
            </Link>
          </span>
          <span className='ml-3'>
            <Link to='/privacy-and-terms' className=''>
              Privacy & Terms
            </Link>
          </span>
          <span className='ml-3'>
            <Link to='/about-translator' className=''>
              Tentang
            </Link>
          </span>
        </Col>
      </React.Fragment>
    );
  }
}

TranslateFooter.propTypes = propTypes;
TranslateFooter.defaultProps = defaultProps;

export default TranslateFooter;
