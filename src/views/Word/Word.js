import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { search, del, clear } from '../../actions/wordActions';
import { connect } from 'react-redux';
import Alerts from '../../components/Alerts';
import DefaultTable from '../../components/DefaultTable';
import { Card, CardBody, CardHeader } from 'reactstrap';

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    headerAttrs: { width: 80 }
  },
  {
    dataField: 'word',
    asDisplayed: true,
    text: 'Word',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'shown',
    text: 'Shown',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'language',
    text: 'Language',
    headerAttrs: { width: 130 },
    filterType: 'language'
  },
  {
    dataField: 'word_type',
    text: 'Type',
    headerAttrs: { width: 80 },
    filterType: 'text'
  },
  {
    dataField: 'prefix',
    text: 'Prefix',
    headerAttrs: { width: 80 },
    filterType: 'text'
  },
  {
    dataField: 'suffix',
    text: 'Suffix',
    headerAttrs: { width: 80 },
    filterType: 'text'
  },
  {
    dataField: 'word_root',
    text: 'Root',
    headerAttrs: { width: 130 },
    filterType: 'text'
  },
  {
    dataField: 'is_on_dictionary',
    typeCol: 'bool',
    text: 'In Dict',
    align: 'center',
    filterType: 'bool',
    headerAttrs: { width: 110 }
  },
  {
    dataField: 'status_id',
    typeCol: 'status',
    text: 'Status',
    align: 'center',
    filterType: 'status',
    headerAttrs: { width: 110 }
  },
  {
    dataField: 'description',
    text: 'Description'
  },
  {
    dataField: 'action',
    typeCol: 'action',
    text: 'Action',
    sort: false,
    headerAttrs: { width: 180 }
  }
];

class Word extends Component {
  render() {
    const { items, limit, page, total_items } = this.props.searchResult;
    return (
      <div className='animated fadeIn'>
        <Card>
          <CardHeader>
            <i className='fa fa-align-justify'></i>
            <strong> Word </strong> Management &nbsp;
            <Link to='word/add' className='btn btn-primary btn-sm '>
              <i className='fa fa-plus'></i> Add
            </Link>
          </CardHeader>
          <CardBody>
            <Alerts />
            <DefaultTable
              columns={columns}
              data={items}
              page={page}
              sizePerPage={limit}
              totalSize={total_items}
              searchApi={this.props.search}
              lastSearchCriteria={this.props.lastSearchCriteria}
              path={this.props.location.pathname}
              delete={this.props.del}
              clear={this.props.clear}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResult: state.word.searchResult,
  lastSearchCriteria: state.word.lastSearchCriteria
});

export default connect(
  mapStateToProps,
  { search, del, clear }
)(withRouter(Word));
