import React, { Component } from 'react';
import { Col, Jumbotron, Row } from 'reactstrap';
import HTMLHead from '../../components/HTMLHead';

class AboutMongosilakan extends Component {
  render() {
    return (
      <div className='animated fadeIn'>
        <HTMLHead title='Tentang' />
        <Row>
          <Col>
            <Jumbotron>
              <h1 className='display-3'>Tentang Mongosilakan</h1>
              <Row>
                <Col md='6'>
                  <p className='lead'>
                    Layanan terjemahan online Bahasa Indonesia ke Bahasa Jawa
                    dan sebaliknya dengan unggah-unguh Bahasa Jawa.
                  </p>
                  <hr className='my-2' />
                  <p>
                    Bahasa yang didukung: Bahasa Indonesia, Bahasa Jawa Ngoko,
                    Bahasa Jawa Krama, dan Bahasa Jawa Krama Inggil.
                  </p>
                  {/* <p className='lead'>
                    <Button color='primary'>Learn More</Button>
                  </p> */}
                </Col>
                <Col md='6'>{/* <img src={bookImage} alt='Book' />; */}</Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AboutMongosilakan;
