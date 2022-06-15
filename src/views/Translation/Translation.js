import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  search,
  del,
  clear,
  createByWord,
  updateByDetails
} from '../../actions/translationActions';
import { connect } from 'react-redux';
import Alerts from '../../components/Alerts';
import TranslationTable from '../../components/TranslationTable';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';

const columns = [
  {
    dataField: 'translation_id',
    align: 'center',
    text: 'ID',
    sort: true,
    editable: false,
    headerAttrs: { width: 80 }
  },
  {
    dataField: 'source_language_id',
    typeCol: 'language',
    align: 'center',
    text: 'Language',
    headerAttrs: { width: 130 },
    filterType: 'language',
    editable: false,
    defaultFilterValue: 1
    // headerStyle: { backgroundColor: '#f3f3f3' },
    // style: { backgroundColor: '#f3f3f3' }
  },
  {
    dataField: 'source',
    asDisplayed: true,
    text: 'Source',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'source_shown',
    text: ' Shown',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'result_language_id',
    typeCol: 'language',
    align: 'center',
    text: 'Language',
    headerAttrs: { width: 130 },
    filterType: 'language',
    editable: false,
    defaultFilterValue: 2
    // headerStyle: { backgroundColor: '#f3f3f3' },
    // style: { backgroundColor: '#f3f3f3' }
  },
  {
    dataField: 'result',
    asDisplayed: true,
    text: 'Result',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'result_shown',
    text: 'Shown',
    sort: true,
    filterType: 'text'
  },

  {
    dataField: 'is_on_dictionary',
    typeCol: 'bool',
    text: 'In Dict',
    align: 'center',
    filterType: 'bool',
    defaultFilterValue: 1,
    headerAttrs: { width: 95 }
  },
  {
    dataField: 'translation_status_id',
    typeCol: 'status',
    text: 'Status',
    align: 'center',
    filterType: 'status',
    headerAttrs: { width: 110 }
  },
  {
    dataField: 'rates',
    text: 'Rates',
    editable: false,
    sort: true
  },
  {
    dataField: 'by',
    editable: false,
    text: 'By'
  },
  {
    dataField: 'modified_at',
    text: 'Modified at',
    sort: true
  },
  {
    dataField: 'action',
    editable: false,
    typeCol: 'action',
    text: 'Action'
  }
];

const defaultSorted = [
  {
    dataField: 'translation_id',
    order: 'asc'
  }
];
class Translation extends Component {
  refresh = () => {
    this.props.search(this.props.lastSearchCriteria);
  };
  render() {
    const { items, limit, page, total_items } = this.props.searchResult;
    return (
      <div className='animated fadeIn'>
        <Card>
          <CardHeader>
            <i className='fa fa-align-justify'></i>
            <strong> Translation </strong> Management &nbsp;
            {/* <Link to='translation/add' className='btn btn-primary btn-sm '>
              <i className='fa fa-plus'></i> Add
            </Link> */}
          </CardHeader>
          <CardBody>
            <Alerts />
            <div className='row'>
              <div className='col-md-6'>
                <p>
                  <strong>*</strong> You can press <strong>double click</strong>{' '}
                  to edit
                  <br />
                  <strong>**</strong> Editable colums:
                  <i>
                    <strong> Source</strong>,<strong> Result</strong>,
                    <strong> Shown</strong>,<strong> In Dict</strong> &
                    <strong> Status</strong>
                  </i>
                </p>
              </div>
              <div className='col-md-6 '>
                <Button
                  onClick={this.refresh}
                  outline
                  color='secondary'
                  className='m-2 pull-right'
                >
                  <i className='fa fa-refresh'></i>
                </Button>
              </div>
            </div>
            <TranslationTable
              columns={columns}
              data={items}
              page={page}
              sizePerPage={limit}
              totalSize={total_items}
              searchApi={this.props.search}
              lastSearchCriteria={this.props.lastSearchCriteria}
              path={this.props.location.pathname}
              add={this.props.createByWord}
              updateByDetails={this.props.updateByDetails}
              delete={this.props.del}
              clear={this.props.clear}
              defaultSorted={defaultSorted}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResult: state.translation.searchResult,
  lastSearchCriteria: state.translation.lastSearchCriteria
});

export default connect(
  mapStateToProps,
  { search, del, clear, createByWord, updateByDetails }
)(withRouter(Translation));
