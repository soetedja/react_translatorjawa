import React, { Component } from 'react';
import { search, del, clear } from '../../actions/statusActions';
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
    dataField: 'type',
    text: 'Type',
    sort: true,
    filterType: 'text',
    headerAttrs: { width: 200 }
  },
  {
    dataField: 'description',
    typeCol: 'text',
    text: 'Description',
    align: 'center',
    filterType: 'text'
  },
  {
    dataField: 'action',
    typeCol: 'action',
    text: 'Action',
    sort: false,
    headerAttrs: { width: 180 }
  }
];

class Status extends Component {
  render() {
    const { items, limit, page, total_items } = this.props.searchResult;
    return (
      <div className='animated fadeIn'>
        <Card>
          <CardHeader>
            <i className='fa fa-align-justify'></i>
            <strong> Status </strong> Management &nbsp;
            <Link to='status/add' className='btn btn-primary btn-sm '>
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
  searchResult: state.status.searchResult,
  lastSearchCriteria: state.status.lastSearchCriteria
});

export default connect(
  mapStateToProps,
  { search, del, clear }
)(withRouter(Status));
