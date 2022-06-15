import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, Input, Jumbotron, Row } from 'reactstrap';
import { toggleAside } from '../../actions/appActions';
import { selectFrom, selectTo, swap } from '../../actions/languageActions';
import { translate, clearResult } from '../../actions/translateActions';
import { googleAuth } from '../../actions/authActions';
import {
  add as saveToCollection,
  getSavedTranslation
} from '../../actions/starredTranslationActions';
import ChooseLanguageButton from '../../components/ChooseLanguageButton';
import ChooseLanguageButtonMobile from '../../components/ChooseLanguageButtonMobile';
import HTMLHead from '../../components/HTMLHead';
import TranslationResult from '../../components/TranslationResult';
import { Popover, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import isEmpty from '../../validation/is-empty';

class Translate extends Component {
  constructor(props) {
    super(props);

    this.changed = _.debounce(this.handleChange, 1050);
    // this.onChangeTextDelayed = _.debounce(this.onChangeText, 2000);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
      rows: 3,
      resultRows: 3,
      minRows: 3,
      maxRows: 20,
      editMode: false,
      editValue: ''
    };
    this.textareaResult = React.createRef();
  }

  componentWillUnmount() {
    this.props.clearResult();
  }

  toggle = i => {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
  };

  swap = () => {
    this.props.swap();
    this.props.translate(this.state.value);
  };

  onSelectFrom = data => {
    this.props.selectFrom(data);
    this.props.translate(this.state.value);
  };

  onSelectTo = data => {
    this.props.selectTo(data);
    this.props.translate(this.state.value);
  };

  getTextAreaRow = event => {
    const textareaLineHeight = 34;
    const { minRows, maxRows } = this.state;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }
    return currentRows;
  };

  handleChange = event => {
    if (event.target) {
      const source = event.target.value;
      this.setState({ source }, () => {
        this.changed(source);
      });
      const { maxRows } = this.state;
      let currentRows = this.getTextAreaRow(event);
      this.setState({
        value: event.target.value,
        rows: currentRows < maxRows ? currentRows : maxRows,
        editMode: false
      });
      if (isEmpty(event.target.value)) {
        this.props.clearResult();
      }
    } else {
      if (!isEmpty(event)) {
        this.props.translate(event);
      }
    }
  };

  onClickDictionary = () => {
    this.props.toggleAside(true, '1');
  };

  onClickHistory = () => {
    this.props.toggleAside(true, '2');
  };

  onClickSaved = () => {
    // this.props.getSavedTranslation();
    this.props.toggleAside(true, '3');
  };

  renderLanguagesDropdown = () => {
    let width = window.innerWidth;
    if (width > 768) {
      return (
        <Col xs='12' md='12' className='row justify-content-center pl-0 pr-0'>
          <Col md='6' className='text-right pl-0 pr-5'>
            <ChooseLanguageButton
              onSelect={this.onSelectFrom}
              languages={this.props.from}
              selected={this.props.selectedFrom}
            />
          </Col>
          <div
            className='swap-container'
            style={{ position: 'absolute', zIndex: 9999 }}
          >
            <Button color='link' className='swap-button' onClick={this.swap}>
              <i className='fa fa-exchange'></i>
            </Button>
          </div>
          <Col md='6' className='choose-lang-result text-right pl-5 pr-0'>
            <ChooseLanguageButton
              onSelect={this.onSelectTo}
              languages={this.props.to}
              selected={this.props.selectedTo}
            />
          </Col>
        </Col>
      );
    }
    return (
      <Col xs='12' md='12' className='row justify-content-center pl-0 pr-0'>
        <Col sm='6' className='pl-0' style={{ width: '50%' }}>
          <ChooseLanguageButtonMobile
            onSelect={this.onSelectFrom}
            languages={this.props.from}
            selected={this.props.selectedFrom}
          />
        </Col>
        <div
          className='swap-container'
          style={{ position: 'absolute', zIndex: 9999 }}
        >
          <Button color='link' className='swap-button' onClick={this.swap}>
            <i className='fa fa-exchange'></i>
          </Button>
        </div>
        <Col
          sm='6'
          className='choose-lang-result pr-0'
          style={{ width: '50%' }}
        >
          <ChooseLanguageButtonMobile
            onSelect={this.onSelectTo}
            languages={this.props.to}
            selected={this.props.selectedTo}
          />
        </Col>
      </Col>
    );
  };

  copyToClipboard = () => {
    message.success('Copied to Clipboard');
  };

  getStringResult = () => {
    let result = '';
    for (var res of this.props.result.advanced) {
      result += res[0].result;
    }
    return result;
  };

  handleResultTextAreaChange = event => {
    const { maxRows } = this.state;
    let currentRows = this.getTextAreaRow(event);

    this.setState({
      editValue: event.target.value,
      resultRows: currentRows < maxRows ? currentRows : maxRows
    });
  };

  onFocusTextArea = event => {
    var temp_value = event.target.value;
    event.target.value = '';
    event.target.value = temp_value;
    const { maxRows } = this.state;
    let currentRows = this.getTextAreaRow(event);

    this.setState({
      resultRows: currentRows < maxRows ? currentRows : maxRows
    });
  };

  renderResultArea = () => {
    if (this.state.editMode) {
      return (
        <Input
          ref={this.textareaResult}
          autoFocus
          onFocus={this.onFocusTextArea}
          required
          id='editValue'
          onChange={this.handleResultTextAreaChange}
          value={this.state.editValue}
          name='editValue'
          placeholder=''
          type='textarea'
          spellCheck={false}
          size='12'
          className='pl-3 py-0'
          rows={this.state.resultRows}
        />
      );
    } else {
      return <TranslationResult />;
    }
  };

  starTranslation = e => {
    console.log('TCL: e', e.target.value);
  };

  toggleEditMode = e => {
    this.setState({ editMode: true, editValue: this.getStringResult() });
  };

  cancelEdit = () => {
    this.setState({
      editMode: false
    });
  };

  saveToCollection = () => {
    const { source } = this.state;
    this.props.saveToCollection(source, this.getStringResult()).then(res => {
      console.log('TCL: saveToCollection -> res', res);
      if (res) this.props.getSavedTranslation();
    });
  };

  submitEdit = () => {
    this.setState({
      editMode: false
    });
  };
  content = txt => <span>{txt}</span>;
  renderResultButton = () => {
    if (this.state.editMode) {
      return (
        <Col xs='12' md='12' className='text-right px-0 py-0'>
          <Col md='12' className='px-0 py-0'>
            <Button color='link btn-text-result' onClick={this.cancelEdit}>
              BATAL
            </Button>
            <Button color='link btn-text-result' onClick={this.submitEdit}>
              SIMPAN
            </Button>
          </Col>
          <Col md='12' className='contribute-message text-left py-2 ml-0 '>
            <span>
              Kontribusi anda akan digunakan untuk meningkatkan kualitas
              terjemahan.
            </span>
          </Col>
        </Col>
      );
    } else if (this.props.result.advanced.length > 0) {
      return (
        <Col xs='12' md='12' className='text-right py-0 pr-1'>
          <Popover content={this.content('Simpan Terjemahan')} trigger='hover'>
            <Button
              color='link'
              className='pull-left py-0 px-0  btn-icon-result'
              onClick={this.saveToCollection}
            >
              <i className='fa fa-star-o'></i>
            </Button>
          </Popover>

          <CopyToClipboard
            text={this.getStringResult()}
            onCopy={this.copyToClipboard}
          >
            <Popover
              content={this.content('Copy to Clipboard')}
              trigger='hover'
            >
              <Button color='link' className=' py-0 px-0 mr-3 btn-icon-result'>
                <i className='fa fa-copy'></i>
              </Button>
            </Popover>
          </CopyToClipboard>

          <Popover content={this.content('Sarankan edit')} trigger='hover'>
            <Button
              color='link'
              className=' py-0 mr-3 px-0 btn-icon-result'
              onClick={this.toggleEditMode}
            >
              <i className='fa fa-pencil'></i>
            </Button>
          </Popover>

          <Popover content={this.content('Bagikan')} trigger='hover'>
            <Button
              color='link'
              className=' py-0 px-0 mr-3 btn-icon-result'
              disabled
            >
              <i className='fa fa-share-alt'></i>
            </Button>
          </Popover>
        </Col>
      );
    }
  };

  render() {
    return (
      <div className='animated fadeIn'>
        <HTMLHead title='Terjemahan' />
        <div className='row justify-content-md-center  pt-2'>
          <div className='col col-sm-1 empty-side'></div>
          <div className=' col-10 translate-button-container justify-content-left pl-0 pr-0 mt-3'>
            <Col sm='12' className='pl-0  pr-0'>
              <Button
                className='btn-html5 btn-brand text mr-1 mb-1'
                onClick={this.onClickSaved}
              >
                <i className='icon-star'></i>
                <span>Tersimpan</span>
              </Button>
              <Button
                disabled
                className='btn-instagram btn-brand text mr-1 mb-1'
                onClick={this.onClickHistory}
              >
                <i className='icon-clock'></i>
                <span>Riwayat</span>
              </Button>
              <Button
                className='btn-facebook btn-brand text mr-1 mb-1 pull-right'
                onClick={this.onClickDictionary}
              >
                <i className='icon-book-open'></i>
                <span>Kamus</span>
              </Button>
            </Col>
          </div>
          <div className='col col-sm-1 empty-side'></div>
        </div>

        <div className='row justify-content-md-center pt-2 mb-1'>
          <div className='col col-sm-1 empty-side'></div>
          <div className=' col-10 justify-content-center translate-container'>
            {this.renderLanguagesDropdown()}
            <Col md='6' className='text-right pr-4 pl-0'>
              <Input
                spellCheck={false}
                onChange={this.handleChange}
                value={this.state.source || ''}
                id='source'
                type='textarea'
                name='source'
                rows={this.state.rows}
                placeholder=''
              />
            </Col>

            {/* <div className='col-xs-2'>
              <Button color='ghost-light' onClick={this.swap}>
                &nbsp;<i className='fa fa-exchange'></i>&nbsp;
              </Button>
            </div> */}
            <Col md='6' className='result-container pl-0 text-left'>
              <Col xs='12' md='12' id='result' className='text-left pt-2 pl-0 '>
                {this.renderResultArea()}
              </Col>
              {this.renderResultButton()}
            </Col>
          </div>
          <div className='col col-sm-1 empty-side'></div>
        </div>
        {/* <Row>
          <Col className='text-center'>
            <Jumbotron>
              <h1 className='display-4'>Dapatkan fitur yang lebih lengkap</h1>
              <Row>
                <Col md='12'>
                  <p className='lead'>
                    Simpan terjemahan, lihat riwayat, dan masih banyak lagi.
                  </p>
                  <a href='https://play.google.com/store/apps/details?id=net.mongosilakan.mobile&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                    <img
                      width='200'
                      alt='Temukan di Google Play'
                      src='https://play.google.com/intl/en_us/badges/static/images/badges/id_badge_web_generic.png'
                    />
                  </a>
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // searchResult: state.language.searchResult,
  from: state.language.from,
  to: state.language.to,
  selectedFrom: state.language.selectedFrom,
  selectedTo: state.language.selectedTo,
  result: state.translate.result
});

export default connect(
  mapStateToProps,
  {
    translate,
    selectFrom,
    selectTo,
    swap,
    toggleAside,
    clearResult,
    saveToCollection,
    getSavedTranslation,
    googleAuth
  }
)(withRouter(Translate));
