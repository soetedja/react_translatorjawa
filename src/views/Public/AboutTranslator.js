import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Jumbotron, Row } from 'reactstrap';
import bookImage from '../../assets/img/page/about/Wallpaper-book.jpg';
import HTMLHead from '../../components/HTMLHead';

class AboutTranslator extends Component {
  render() {
    return (
      <div className='animated fadeIn'>
        <HTMLHead title='Tentang Translator' />
        <Row>
          <Col>
            <Jumbotron>
              <h1 className='display-3'>Tentang Translator</h1>
              <Row>
                <Col md='6'>
                  <p className='lead'>
                    Layanan terjemahan online Bahasa Indonesia ke Bahasa Jawa
                    dan sebaliknya dengan unggah-unguh Bahasa Jawa.
                  </p>
                  <hr className='my-2' />
                  <p>
                    Translator ini merupakan proyek pribadi yang dikembangkan
                    dengan maksud untuk melestarikan dan mempermudah dalam
                    pencarian terjemahan Bahasa Jawa.
                  </p>
                  <p>
                    Data terjemahan di input secara manual dengan menggunakan
                    referensi buku/kamus Bahasa Jawa yang bagi kami masih sangat
                    terbatas. Oleh karena itu mohon dimaklumi apabila masih
                    banyak ditemukan kekurangan dalam hasil penerjemahan dari
                    aplikasi ini. Namun kami tetap berusaha terus untuk
                    mengembangkan aplikasi ini agar menjadi lebih baik.
                  </p>
                  <p>
                    Bahasa yang didukung untuk saat ini masih terbatas meliputi:
                  </p>
                  <ul>
                    <li>Bahasa Indonesia</li>
                    <li>Bahasa Jawa Ngoko</li>
                    <li>Bahasa Jawa Krama</li>
                    <li>Bahasa Jawa Krama Inggil</li>
                  </ul>
                  <p>
                    Besar harapan kami untuk dapat mengembangkan aplikasi ini
                    tidak hanya untuk Bahasa Jawa, tetapi juga untuk
                    bahasa-bahasa daerah lain di Indonesia.
                  </p>
                  <p>
                    Apabila ada yang berkenan untuk membantu mengembangkan
                    aplikasi Translator ini, baik berupa tenaga, ilmu, ataupun
                    materi, silahkan isi form di
                    <Link to='/contact-us' className='btn btn-link'>
                      <i className='fa fa-pencil'></i>&nbsp; sini
                    </Link>
                    .
                  </p>
                  <h5 className='display-5'>Referensi yang digunakan:</h5>
                  <hr className='my-2' />
                  <ul>
                    <li>Kamus Unggah-Ungguh Bahasa Jawa</li>
                  </ul>
                  {/* <p className='lead'>
                    <Button color='primary'>Learn More</Button>
                  </p> */}
                </Col>
                <Col md='6'>
                  <img
                    src={bookImage}
                    alt='Book - by Aaron Burden on Unsplash'
                    style={{ width: '100%' }}
                  />
                  ;
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AboutTranslator;
