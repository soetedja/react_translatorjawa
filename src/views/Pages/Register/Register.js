import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import { googleAuth } from '../../../actions/authActions';
import { GOOGLE_CLIENT_ID } from '../../../constants';

class Register extends Component {
  responseGoogle = response => {
    this.props.googleAuth(response.tokenId);
  };

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/translate');
    }
  }

  render() {
    return (
      <div className='app flex-row align-items-center'>
        <Container>
          <Row className='justify-content-center'>
            <Col md='9' lg='7' xl='6'>
              <Card className='mx-4'>
                <CardBody className='p-4'>
                  <Tooltip
                    placement='right'
                    title='Dalam proses pengembangan. Silahkan daftar dengan Google.'
                    arrowPointAtCenter
                  >
                    <Form>
                      <fieldset disabled='disabled'>
                        <h1>Daftar</h1>
                        <p className='text-muted'>Buat akun anda</p>
                        <InputGroup className='mb-3'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='icon-user'></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type='text'
                            placeholder='Username'
                            autoComplete='username'
                          />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type='text'
                            placeholder='Email'
                            autoComplete='email'
                          />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='icon-lock'></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type='password'
                            placeholder='Password'
                            autoComplete='new-password'
                          />
                        </InputGroup>
                        <InputGroup className='mb-4'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='icon-lock'></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type='password'
                            placeholder='Repeat password'
                            autoComplete='new-password'
                          />
                        </InputGroup>
                        <Button color='success' block>
                          Create Account
                        </Button>
                      </fieldset>
                    </Form>
                  </Tooltip>
                </CardBody>
                <CardFooter className='p-4 text-center'>
                  <Row>
                    <Col xs='12'>
                      <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText='SIGN UP WITH GOOGLE'
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col xs='12' sm='6'>
                      <Button className='btn-facebook mb-1' block>
                        <span>facebook</span>
                      </Button>
                    </Col>
                    <Col xs='12' sm='6'>
                      <Button className='btn-twitter mb-1' block>
                        <span>twitter</span>
                      </Button>
                    </Col>
                  </Row> */}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { googleAuth }
)(Register);
