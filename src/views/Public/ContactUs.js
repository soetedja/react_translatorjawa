import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Col, Jumbotron, FormGroup, Row, Form } from 'reactstrap';
import Alerts from '../../components/Alerts';
import InputGroup from '../../components/InputGroup';
import SelectGroup from '../../components/SelectGroup';
import HTMLHead from '../../components/HTMLHead';
import { submitForm } from '../../actions/contactUsActions';

class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: '',
      entity: {},
      formErrors: {}
    };
  }
  fields = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      placeholder: 'Enter name...'
    },
    // {
    //   name: 'status_id',
    //   type: 'select',
    //   label: 'Status',
    //   placeholder: 'Enter status...',
    //   options: this.props.allStatuses.map(item => {
    //     return { label: item.name, value: item.id };
    //   })
    // },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter description...'
    }
  ];

  jobOptions = [
    { label: 'Pelajar', value: 'STUDENT' },
    { label: 'Mahasiswa', value: 'COLLEGE_STUDENT' },
    { label: 'Ahli Bahasa', value: 'LINGUIST' },
    { label: 'Guru/Dosen', value: 'TEACHER' },
    { label: 'Lainnya', value: 'OTHER' }
  ];

  categoryOptions = [
    { label: 'Saya ingin bertanya', value: 'QUESTION' },
    { label: 'Saya ingin berkontribusi', value: 'CONTRIBUTE' },
    { label: 'Saya ingin memberi buku referensi', value: 'REFERENCE' },
    { label: 'Saya ingin memberi donasi', value: 'DONATE' },
    { label: 'Lainnya', value: 'OTHER' }
  ];

  handleFieldChange = (fieldId, value, errors) => {
    if (errors.length > 0) {
      this.setState(
        { errors: { ...this.state.errors, [fieldId]: errors } },
        () => this.validateForm()
      );
    } else {
      this.setState({ errors: { ...this.state.errors, [fieldId]: {} } }, () =>
        this.validateForm()
      );
    }
    let changedValue = { ...this.state.entity, [fieldId]: value };
    this.setState({ entity: changedValue, changedValue });
    // this.props.onFieldChange(changedValue);
  };

  validateForm() {
    let valid = true;
    for (var error in this.state.errors) {
      if (Object.entries(this.state.errors[error]).length > 0) {
        valid = false;
      }
    }
    this.setState({ formValid: valid });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.submitForm(this.state.entity).then(res => {
      if (res) {
        this.props.history.push('/thanks');
      }
    });
  };

  render() {
    return (
      <div className='animated fadeIn'>
        <HTMLHead title='Contact Us' />
        <Row>
          <Col>
            <Jumbotron>
              <h1 className='display-3'>Hubungi Kami</h1>
              <p className='lead'>
                Ingin menanyakan sesuatu mengenai Mongosilakan.net? Silahkan
                ajukan pertanyaan seputar Mongosilakan dan kami akan merespon
                setiap pertanyaan dari Anda dan pihak lainnya sesegera mungkin.
              </p>
              <hr className='my-5' />
              <Row>
                <Col md='5'>
                  <h1 className='display-5'>Jangkau Kami</h1>
                  <hr className='my-3' />
                  <p className='lead'>
                    Hubungi kami melalui email atau nomor WhatsApp dibawah ini.
                    Atau melalui formulir berikut:
                  </p>
                  <p className='lead mb-0'>
                    <strong>Alamat:</strong>
                  </p>
                  <p className='lead'>Umbulharjo, Yogyakarta</p>

                  <p className='lead mb-0'>
                    <strong>WhatsApp:</strong>
                  </p>
                  <p className='lead'>
                    <a
                      href='https://api.whatsapp.com/send?phone=6285642327346&text=Hallo Admin'
                      target='blank'
                    >
                      085 642 327 346
                    </a>
                  </p>

                  <p className='lead mb-0'>
                    <strong>Email:</strong>
                  </p>
                  <p className='lead'>
                    <a href='mailto:soetedja@gmail.com'>soetedja@gmail.com</a>
                  </p>
                </Col>
                <Col md='7' className='px-0'>
                  <Col md='12'>
                    <h1 className='display-5'>Formulir kontak</h1>
                    <hr className='my-3' />
                  </Col>
                  {/* <AutoGenerateForm
                  name='Contact'
                  entity={this.state.role}
                  fields={this.fields}
                  autoComplete='off'
                  goBack={this.goBack}
                  onSubmit={this.onSubmit}
                  errors={this.props.errors}
                /> */}

                  <Form
                    onSubmit={this.onSubmit}
                    className='form-horizontal'
                    autoComplete={this.props.autoComplete}
                  >
                    <Col md='12'>
                      <Alerts />
                    </Col>
                    <FormGroup row>
                      <InputGroup
                        alerts={this.props.errors}
                        required={true}
                        id='first_name'
                        onChange={this.handleFieldChange}
                        value={this.state.entity.first_name}
                        name='first_name'
                        label='Nama Depan*'
                        placeholder='Nama Depan'
                        type='text'
                      />
                      <InputGroup
                        alerts={this.props.errors}
                        required={true}
                        id='last_name'
                        onChange={this.handleFieldChange}
                        value={this.state.entity.last_name}
                        name='last_name'
                        label='Nama Belakang*'
                        placeholder='Nama Belakang'
                        type='text'
                      />
                    </FormGroup>
                    <FormGroup row>
                      <InputGroup
                        alerts={this.props.errors}
                        required={true}
                        id='email'
                        onChange={this.handleFieldChange}
                        value={this.state.entity.email}
                        name='email'
                        label='Email*'
                        placeholder='Email'
                        type='email'
                      />
                      <InputGroup
                        alerts={this.props.errors}
                        id='phone'
                        onChange={this.handleFieldChange}
                        value={this.state.entity.phone}
                        name='phone'
                        label='Hp (Opsional)'
                        placeholder='No Hp'
                        type='text'
                      />
                    </FormGroup>
                    <FormGroup row>
                      <SelectGroup
                        options={this.jobOptions}
                        required={true}
                        id='job'
                        onChange={this.handleFieldChange}
                        value={this.state.entity.job}
                        name='job'
                        label='Saya seorang:*'
                        placeholder='Pekerjaan'
                      />
                      <SelectGroup
                        options={this.categoryOptions}
                        required={true}
                        id='category'
                        onChange={this.handleFieldChange}
                        value={this.state.entity.category}
                        name='category'
                        label='Perihal:*'
                        placeholder='Perihal'
                      />
                      <InputGroup
                        alerts={this.props.errors}
                        required={true}
                        id='message'
                        onChange={this.handleFieldChange}
                        value={this.state.entity.message}
                        name='message'
                        label='Pesan*'
                        placeholder='Pesan'
                        type='textarea'
                        size='12'
                        rows='6'
                      />
                    </FormGroup>
                    <FormGroup>
                      <Col md='12' className='text-right'>
                        <Button
                          block
                          type='submit'
                          size='lg'
                          color='primary'
                          disabled={!this.state.formValid}
                        >
                          <i className='fa fa-dot-circle-o'></i> Kirim
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
              {/*               
              <p className='lead'>
                <Button color='primary'>Learn More</Button>
              </p> */}
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  role: state.role.current,
  errors: state.errors,
  allLanguages: state.language.all,
  allStatuses: state.status.all
});

export default withRouter(
  connect(
    mapStateToProps,
    { submitForm }
  )(ContactUs)
);
