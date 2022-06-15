import classNames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  Badge,
  TabContent,
  TabPane,
  Tooltip,
  Col,
  Row
} from 'reactstrap';
import { setActiveTab, toggleAside } from '../../actions/appActions';
import { getWordDictionaryDetails } from '../../actions/translateActions';
import {
  del as deleteSavedTranslation,
  getSavedTranslation
} from '../../actions/starredTranslationActions';
import DictionarySearch from '../../components/DictionarySearch';
import * as moment from 'moment';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class TranslateAside extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      tooltipDictionaryOpen: [false, false, false]
    };
    const wait = 700; // milliseconds
    this.debouncedLoadOptions = _.debounce(this.loadOptions, wait);
  }
  toggle = tab => {
    this.props.setActiveTab(tab);
    // if (this.props.app.aSideTab !== tab) {
    //   this.setState({
    //     activeTab: tab
    //   });
    // }
  };

  toggleTooltip = i => {
    const newArray = this.state.tooltipDictionaryOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      tooltipDictionaryOpen: newArray
    });
  };
  loadOptions = (inputValue, callback) => {
    if (inputValue) {
      this.getAsyncOptions(inputValue).then(results => callback(results));
    } else {
      this.getAsyncOptions(this.props.value).then(results => callback(results));
    }
    return;
  };

  getAsyncOptions = inputValue => {
    return this.props.asyncFunc(inputValue).then(res => {
      if (res) {
        let ops = res.map(category => ({
          value: category.id,
          label: category.word
        }));
        return ops;
      }
    });
  };

  onSelectSearch = params => {
    this.props.getWordDictionaryDetails(params);
  };

  colors = ['success', 'primary', 'danger', 'warning', 'info', 'secondary'];
  renderDictionaryResult = () => {
    if (!this.props.dictionaryResult.length) return <span></span>;
    let result = [];
    const resByLang = this.props.languages.map((lang, idx) => {
      if (idx >= 4) return <span key={idx}></span>;
      return (
        <div key={idx}>
          <ListGroupItem className='list-group-item-accent-secondary bg-light font-weight-bold text-muted text-uppercase small'>
            {lang.name}
          </ListGroupItem>
          <ListGroupItem className='list-group-item-accent-danger list-group-item-divider'>
            <div>
            {this.props.dictionaryResult
              .filter((thing, index, self) =>
              index === self.findIndex((t) => (
                lang.id === t.result_language_id && t.result === thing.result
              )))
                .map((value, id) => {
                  return (
                    <span key={`${id}${lang.id}`}>
                      {(id ? ', ' : '') + value.result}
                    </span>
                  );
                })}
              {/* New UI Project - <strong>deadline</strong> */}
            </div>
            {/* <small className='text-muted mr-3'>
              <i className='icon-calendar'></i>&nbsp; 10 - 11pm
            </small>
            <small className='text-muted'>
              <i className='icon-home'></i>&nbsp; creativeLabs HQ
            </small> */}
          </ListGroupItem>
        </div>
      );
    });

    result.push(resByLang);
    return result;
  };

  onClose = () => {
    this.props.toggleAside(false);
  };

  deleteSavedTranslation = id => {
    this.props.deleteSavedTranslation(id).then(() => {
      this.props.getSavedTranslation();
    });
  };

  renderStarredTranslation = () => {
    return this.props.starredTranslation
      .slice(0)
      .reverse()
      .map((item, id) => {
        return (
          <div className='message' key={id}>
            <div>
              <Badge className='pl-2 pr-2' color='danger'>
                <span>
                  {this.props.languages[item.language_source_id - 1].name}
                </span>
                <i className='fa fa-arrow-right mr-2 ml-2'></i>
                <span>
                  {this.props.languages[item.language_result_id - 1].name}
                </span>
              </Badge>
              <small className='text-muted float-right mt-1'>
                {moment
                  .utc(item.created_at)
                  .local()
                  .fromNow()}
              </small>
            </div>
            <Row>
              <Col md='10'>
                <div className='font-weight-normal'>{item.source_text}</div>
                <div
                  className='font-weight-normal font-italic'
                  style={{ color: '#517fa4' }}
                >
                  {item.result_text}
                </div>
              </Col>
              <Col md='2'>
                <Button
                  color='secondary'
                  outline
                  size='sm'
                  className='pull-right border-0'
                  onClick={() => this.deleteSavedTranslation(item.id)}
                >
                  <i className='fa fa-trash'></i>
                </Button>
                {/* <small className='text-muted float-right mt-1'><i className='fa fa-expand '></i></small>
            <small className='text-muted float-right mt-1'><i className='fa fa-trash '></i></small> */}
              </Col>
            </Row>
            <hr />
          </div>
        );
      });
  };

  renderCloseBtn = () => {
    if (this.props.app.aSideOpen)
      return (
        <Button
          outline
          color='light'
          className='close-aside-button btn-square'
          onClick={this.onClose}
        >
          <i className='fa fa-chevron-right'></i>
        </Button>
      );
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        {this.renderCloseBtn()}
        <Nav tabs>
          <NavItem>
            <NavLink
              id='DictionaryTooltip'
              className={classNames({
                active: this.props.app.aSideTab === '1'
              })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              <i className='icon-book-open'></i>
            </NavLink>
            <Tooltip
              placement='right'
              isOpen={this.state.tooltipDictionaryOpen[0]}
              target='DictionaryTooltip'
              toggle={() => {
                this.toggleTooltip(0);
              }}
            >
              Kamus
            </Tooltip>
          </NavItem>
          <NavItem>
            <NavLink
              id='HistoryTooltip'
              className={classNames({
                active: this.props.app.aSideTab === '2'
              })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              <i className='icon-clock'></i>
            </NavLink>
            <Tooltip
              placement='right'
              isOpen={this.state.tooltipDictionaryOpen[1]}
              target='HistoryTooltip'
              toggle={() => {
                this.toggleTooltip(1);
              }}
            >
              Riwayat
            </Tooltip>
          </NavItem>
          <NavItem>
            <NavLink
              id='SavedTooltip'
              className={classNames({
                active: this.props.app.aSideTab === '3'
              })}
              onClick={() => {
                this.toggle('3');
              }}
            >
              <i className='icon-star'></i>
            </NavLink>
            <Tooltip
              placement='right'
              isOpen={this.state.tooltipDictionaryOpen[2]}
              target='SavedTooltip'
              toggle={() => {
                this.toggleTooltip(2);
              }}
            >
              Tersimpan
            </Tooltip>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.props.app.aSideTab}>
          <TabPane tabId='1'>
            <ListGroup className='list-group-accent' tag={'div'}>
              <ListGroupItem
                style={{ borderBottom: '1px solid #c8ced3' }}
                className='search-container list-group-item-accent-link bg-light '
              >
                <div style={{ marginBottom: '5px' }}>
                  <span>Cari kata:</span>
                </div>
                <DictionarySearch onSelect={this.onSelectSearch} />
              </ListGroupItem>
              {this.renderDictionaryResult()}
            </ListGroup>
          </TabPane>
          <TabPane tabId='2' className='p-3'>
            <div className='message'>
              <div className='py-3 pb-5 mr-3 float-left'>
                <div className='avatar'>
                  <img
                    src={'assets/img/avatars/7.jpg'}
                    className='img-avatar'
                    alt='admin@bootstrapmaster.com'
                  />
                  <span className='avatar-status badge-success'></span>
                </div>
              </div>
              <div>
                <small className='text-muted'>Lukasz Holeczek</small>
                <small className='text-muted float-right mt-1'>1:52 PM</small>
              </div>
              <div className='text-truncate font-weight-bold'>
                Lorem ipsum dolor sit amet
              </div>
              <small className='text-muted'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt...
              </small>
            </div>
            <hr />
          </TabPane>
          <TabPane tabId='3' className='p-3'>
            <h6>Starred Translation</h6>
            {this.renderStarredTranslation()}
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

TranslateAside.propTypes = propTypes;
TranslateAside.defaultProps = defaultProps;

const mapStateToProps = state => ({
  dictionaryResult: state.translate.dictionaryResult,
  languages: state.language.from,
  starredTranslation: state.starredTranslation.active,
  app: state.app
});

export default connect(
  mapStateToProps,
  {
    getWordDictionaryDetails,
    toggleAside,
    setActiveTab,
    deleteSavedTranslation,
    getSavedTranslation
  }
)(TranslateAside);
