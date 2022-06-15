import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Row,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';
import { loginUser, googleAuth } from '../../../actions/authActions';
import { GOOGLE_CLIENT_ID } from '../../../constants';
import { Tooltip } from 'antd';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/translate');
    }
  }

  responseGoogle = response => {
    if(response.tokenId === undefined){
      // TO DO: Handle error invalid google client 
      console.log(`ERROR: ${response.error}`)
    } else {
      this.props.googleAuth(response.tokenId);
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };
      this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className='app flex-row align-items-center'>
        <Container>
          <Row className='justify-content-center'>
            <Col md='8'>
              <CardGroup>
                <Card className='p-4'>
                  <CardBody>
                    <Tooltip
                      placement='top'
                      title='Dalam proses pengembangan. Silahkan masuk dengan akun Google.'
                      arrowPointAtCenter
                    >
                      <Form onSubmit={this.onSubmit}>
                        <fieldset disabled>
                          <h1>Masuk</h1>
                          <p className='text-muted'>
                            Silahkan masuk ke akun anda
                          </p>
                          <InputGroup className='mb-3'>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='icon-envelope' />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type='text'
                              placeholder='Email'
                              autoComplete='Email'
                              name='username'
                              value={this.state.username}
                              onChange={this.onChange}
                            />
                          </InputGroup>
                          <InputGroup className='mb-4'>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='icon-lock' />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              name='password'
                              type='password'
                              placeholder='Password'
                              autoComplete='current-password'
                              value={this.state.password}
                              onChange={this.onChange}
                            />
                          </InputGroup>
                          <Row>
                            <Col xs='6'>
                              <Button color='primary' className='px-4'>
                                Masuk
                              </Button>
                            </Col>
                            <Col xs='6' className='text-right'>
                              <Button color='link' className='px-0'>
                                Lupa password?
                              </Button>
                            </Col>
                          </Row>
                        </fieldset>
                      </Form>
                    </Tooltip>
                    <hr />
                    <Row>
                      <Col xs='12' className=''>
                        <GoogleLogin
                          clientId={GOOGLE_CLIENT_ID}
                          buttonText='SIGN IN WITH GOOGLE'
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy={'single_host_origin'}
                        />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col xs='6'></Col>
                      <Col xs='6' className='text-right'>
                        <Link to='/translate'>
                          <Button color='link' className='px-0'>
                            Lewati{' '}
                            <i className='fa font-light ml-3 fa-chevron-right'></i>
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card
                  className='text-white bg-primary py-5 d-md-down-none'
                  style={{ width: '44%' }}
                >
                  <CardBody className='text-center'>
                    <div>
                      <h2>Daftar</h2>
                      <p>
                        Daftarkan email anda dan dapatkan fitur yang lebih
                        lengkap dari Aplikasi Translator Jawa - Mongosilakan.
                      </p>
                      <Link to='/register'>
                        <Button
                          color='primary'
                          className='mt-3'
                          active
                          tabIndex={-1}
                        >
                          Daftar Sekarang!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser, googleAuth }
)(Login);
