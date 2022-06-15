import React, { Component } from 'react';
import { Col, Jumbotron, Row } from 'reactstrap';
import penPaperImage from '../../assets/img/page/privacy/penpapper.jpg';
import privacyImage from '../../assets/img/page/privacy/privacy.jpg';
import HTMLHead from '../../components/HTMLHead';

class PrivacyAndTerms extends Component {
  render() {
    return (
      <div className='animated fadeIn'>
        <HTMLHead title='Privasi & Ketentuan Layanan' />
        <Row>
          <Col>
            <Jumbotron>
              <Row>
                <Col md='7'>
                  <h1 className='display-3'>
                    Kebijakan Privasi & Kententuan Layanan
                  </h1>
                  <p className='lead'>Kebijakan Privasi www.mongosilakan.net</p>
                  <hr className='my-3' />
                  <p>
                    Jika Anda memerlukan informasi lebih lanjut atau memiliki
                    pertanyaan tentang kebijakan privasi kami, jangan ragu untuk
                    menghubungi kami melalui email di soetedja@gmail.com.
                  </p>
                  <p>
                    Dengan menggunakan Mongosilakan Anda setuju dengan Kebijakan
                    Privasi ini.
                  </p>

                  <p className='lead'>Cookie & Web Beacon</p>
                  <hr className='my-3' />
                  <p>
                    Situs ini tidak menggunakan cookies untuk menyimpan
                    informasi pengguna. Beberapa mitra periklanan kami mungkin
                    menggunakan cookies dan suar web di situs kami. Jika Anda
                    ingin menonaktifkan cookies, Anda dapat melakukannya melalui
                    pilihan browser yang terpisah.
                  </p>
                  <p>
                    Informasi lebih lanjut tentang pengelolaan cookie dengan
                    peramban web tertentu dapat ditemukan di setiap browser
                    situs web.
                  </p>
                </Col>
                <Col md='5'>
                  <img
                    src={privacyImage}
                    alt='Privacy'
                    style={{ width: '100%' }}
                  />
                  ;
                </Col>
              </Row>
              <hr className='my-5' />
              <Row>
                <Col md='5'>
                  <img
                    src={penPaperImage}
                    alt='Disclaimer'
                    style={{ width: '100%' }}
                  />
                  ;
                </Col>
                <Col md='7'>
                  <h4 className='display-4'>Warranties and Disclaimers</h4>
                  <p className='lead'>Penyangkalan website</p>
                  <hr className='my-3' />
                  <p>
                    Tampilan situs ini didasarkan pada template React yang
                    disediakan oleh CORE.UI.
                  </p>
                  <p className='lead'>Keterbatasan tanggung jawab</p>
                  <hr className='my-3' />
                  <p>
                    Mongosilakan.net tidak akan bertanggung jawab kepada Anda
                    sehubungan dengan isi, atau penggunaan, atau yang lainnya
                    sehubungan dengan, situs web ini:
                  </p>
                  <ul>
                    <li>Website ini disediakan gratis</li>
                    <li>
                      untuk kerugian tidak langsung, khusus atau konsekuensial;
                      atau
                    </li>
                    <li>
                      untuk kerugian bisnis, kehilangan pendapatan, pendapatan,
                      keuntungan atau penghematan yang diantisipasi, kehilangan
                      kontrak atau hubungan bisnis, kehilangan reputasi atau
                      niat baik, atau kehilangan atau korupsi informasi atau
                      data.
                    </li>
                  </ul>
                  <p>
                    Keterbatasan tanggung jawab ini berlaku bahkan jika
                    Mongosilakan.net telah diberitahu secara jelas tentang
                    potensi kerugiannya.{' '}
                  </p>

                  <p className='lead'>Pihak lain</p>
                  <hr className='my-3' />
                  <p>
                    Anda menerima bahwa, sebagai entitas pertanggungjawaban
                    terbatas, Mongosilakan.net memiliki kepentingan untuk
                    membatasi tanggung jawab pribadi petugas dan karyawannya.
                    Anda setuju bahwa Anda tidak akan membawa klaim apapun
                    kepada petugas atau karyawan Mongosilakan.net sehubungan
                    dengan kerugian yang Anda derita sehubungan dengan situs web
                    tersebut.
                  </p>
                  <p>
                    Tanpa mengurangi paragraf sebelumnya, Anda setuju bahwa
                    keterbatasan jaminan dan kewajiban yang ditetapkan dalam
                    penafian situs web ini akan melindungi petugas, karyawan,
                    agen, anak perusahaan, penerus Mongo, perizinan, penanggung
                    dan subkontraktor serta Mongosilakan.net.
                  </p>

                  <p className='lead'>Tidak ada jaminan</p>
                  <hr className='my-3' />
                  <p>
                    Situs web ini disediakan "sebagaimana adanya" tanpa
                    pernyataan atau jaminan apapun, tersurat maupun tersirat.
                    Mongosilakan.net tidak membuat pernyataan atau jaminan
                    sehubungan dengan situs web ini atau informasi dan materi
                    yang disediakan di situs ini.
                  </p>
                  <p>
                    Tanpa mengurangi keumuman dari paragraf sebelumnya,
                    Mongosilakan.net tidak menjamin bahwa:
                  </p>
                  <ul>
                    <li>
                      Situs ini akan selalu tersedia, atau tersedia sama sekali;
                      atau
                    </li>
                    <li>
                      Informasi di situs ini lengkap, benar, akurat atau tidak
                      menyesatkan.
                    </li>
                  </ul>
                  <p>
                    Tidak ada satu pun situs web ini yang merupakan, atau
                    dimaksudkan untuk membentuk, saran apa pun.
                  </p>

                  <p className='lead'>Kewajaran</p>
                  <hr className='my-3' />
                  <p>
                    Dengan menggunakan situs ini, Anda setuju bahwa pengecualian
                    dan batasan tanggung jawab yang tercantum dalam penafian
                    situs web ini masuk akal.
                  </p>
                  <p>
                    Jika menurut Anda tidak masuk akal, Anda tidak boleh
                    menggunakan situs ini.
                  </p>

                  <p className='lead'>
                    Ketentuan yang tidak dapat diberlakukan
                  </p>
                  <hr className='my-3' />
                  <p>
                    Jika ada ketentuan penafian situs web ini, atau ditemukan,
                    tidak dapat diterapkan berdasarkan undang-undang yang
                    berlaku, hal itu tidak akan mempengaruhi penerapan ketentuan
                    lain dari penafian situs web ini.
                  </p>
                </Col>
              </Row>
              {/* <p>
                <Button color='primary'>Learn More</Button>
              </p> */}
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PrivacyAndTerms;
