import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  UncontrolledDropdown,
  Button
} from 'reactstrap';
import { toggleAside } from '../../actions/appActions';
import { getSavedTranslation } from '../../actions/starredTranslationActions';
import logo from '../../assets/img/brand/logo.svg';
import mongoSimple from '../../assets/img/brand/mongo-simple.svg';
import { GUEST_USER_ID } from '../../constants';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class TranslateHeader extends Component {
  onClickSaved = () => {
    this.props.getSavedTranslation();
    this.props.toggleAside(true, '3');
  };

  renderRightMenuHeader = () => {
    if (this.props.user.id !== GUEST_USER_ID) {
      return (
        <UncontrolledDropdown nav direction='down'>
          <DropdownToggle nav>
            <img
              src={this.props.user.picture}
              className='img-avatar'
              alt={this.props.user.name}
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header tag='div' className='text-center'>
              <strong>Account</strong>
            </DropdownItem>
            <DropdownItem className='text-center'>
              <img
                style={{ minHeight: '96px' }}
                src={this.props.user.picture}
                className='img-avatar mb-3'
                alt={this.props.user.name}
              />{' '}
              <br />
              <h6>{this.props.user.name}</h6>
              <span className='font-italic'>{this.props.user.email}</span>
            </DropdownItem>
            <DropdownItem onClick={this.onClickSaved}>
              <i className='fa fa-star'></i> Tersimpan
              <Badge color='info'>{this.props.starredTranslation.length}</Badge>
            </DropdownItem>
            <DropdownItem disabled>
              <i className='fa fa-tasks'></i> Kontribusi
              <Badge color='success'>~</Badge>
            </DropdownItem>
            <DropdownItem disabled>
              <i className='fa fa-clock-o'></i> Riwayat
              <Badge color='warning'>~</Badge>
            </DropdownItem>
            <DropdownItem header tag='div' className='text-center'>
              <strong>Settings</strong>
            </DropdownItem>
            <DropdownItem disabled>
              <i className='fa fa-user'></i> Profil
            </DropdownItem>
            <DropdownItem disabled>
              <i className='fa fa-wrench'></i> Pengaturan
            </DropdownItem>
            <DropdownItem onClick={e => this.props.onLogout(e)}>
              <i className='fa fa-lock'></i> Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    } else {
      return (
        <NavItem className='d-md-down-none'>
          <NavLink to='/login' className='nav-link'>
            <Button
              color='default'
              className=' text mr-2 mb-1'
              // onClick={this.onClickSaved}
            >
              <span> MASUK </span>
              <i className='fa fa-lg fa-sign-in'></i>
            </Button>
          </NavLink>
        </NavItem>
      );
    }
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className='d-lg-none' display='md' mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 150, height: 28, alt: 'Mongosilakan Logo' }}
          minimized={{
            src: mongoSimple,
            width: 30,
            height: 30,
            alt: 'Mongosilakan Logo'
          }}
        />
        <AppSidebarToggler className='d-md-down-none' display='lg' />

        <Nav className='ml-auto' navbar>
          {this.renderRightMenuHeader()}
        </Nav>
      </React.Fragment>
    );
  }
}

TranslateHeader.propTypes = propTypes;
TranslateHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({
  user: state.auth.user,
  starredTranslation: state.starredTranslation.active
});

export default connect(
  mapStateToProps,
  { getSavedTranslation, toggleAside }
)(TranslateHeader);
