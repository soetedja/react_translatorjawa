import React, { Component } from 'react';
import { Col, Jumbotron, Row } from 'reactstrap';
import HTMLHead from '../../components/HTMLHead';

class Thanks extends Component {
  render() {
    return (
      <div className='animated fadeIn'>
        <HTMLHead title='Tentang' />
        <Row>
          <Col className='text-center'>
            <Jumbotron>
              <h1 className='display-3'>Terima kasih</h1>
              <Row>
                <Col md='12'>
                  <p className='lead'>
                    Terima Kasih telah menghubungi. Kami akan segera menindak
                    lanjuti pesan Anda
                  </p>
                  <p>
                    Apabila pesan Anda bersifat penting, Anda dapat langsung
                    menghubungi kami di:
                  </p>
                  <p className=''>
                    <a
                      href='https://api.whatsapp.com/send?phone=6285642327346&text=Hallo Admin'
                      target='blank'
                    >
                      085 642 327 346
                    </a>{' '}
                    / <a href='mailto:soetedja@gmail.com'>soetedja@gmail.com</a>
                  </p>
                  {/* <p className='lead'>
                    <Button color='primary'>Learn More</Button>
                  </p> */}
                </Col>
                {/* <Col md='6'><img src={bookImage} alt='Book' /></Col> */}
              </Row>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Thanks;
