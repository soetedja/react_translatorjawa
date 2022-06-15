import React, { Component } from 'react';
import { search, del, clear } from '../../actions/wordTypeActions';
import DefaultTable from '../../components/DefaultTable';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Alerts from '../../components/Alerts';
const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    headerAttrs: { width: 80 }
  },
  {
    dataField: 'name',
    asDisplayed: true,
    text: 'Name',
    sort: true,
    filterType: 'text'
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

class WordType extends Component {
  render() {
    const { items, limit, page, total_items } = this.props.searchResult;
    return (
      <div className='animated fadeIn'>
        <Card>
          <CardHeader>
            <i className='fa fa-align-justify'></i>
            <strong> WordType </strong> Management &nbsp;
            <Link to='wordType/add' className='btn btn-primary btn-sm '>
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
  searchResult: state.wordType.searchResult,
  lastSearchCriteria: state.wordType.lastSearchCriteria
});

export default connect(
  mapStateToProps,
  { search, clear, del }
)(withRouter(WordType));
