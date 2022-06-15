import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { search, del, clear } from '../../actions/userActions';
import { connect } from 'react-redux';
import Alerts from '../../components/Alerts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DefaultTable from '../../components/DefaultTable';

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    headerAttrs: { width: 80 }
  },
  {
    dataField: 'username',
    asDisplayed: true,
    text: 'Username',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'email',
    text: 'Email',
    sort: true,
    filterType: 'text'
  },
  // {
  //   dataField: 'language_id',
  //   text: 'Language',
  //   headerAttrs: { width: 130 },
  //   filterType: 'language'
  // },
  {
    dataField: 'status_id',
    typeCol: 'status',
    text: 'Status',
    align: 'center',
    filterType: 'status',
    headerAttrs: { width: 110 }
  },
  {
    dataField: 'level',
    text: 'Level',
    filterType: 'text'
  },
  {
    dataField: 'authorised',
    typeCol: 'bool',
    text: 'Authorised',
    align: 'center',
    filterType: 'bool',
    headerAttrs: { width: 110 }
  },
  {
    dataField: 'action',
    typeCol: 'action',
    text: 'Action',
    sort: false,
    headerAttrs: { width: 180 }
  }
];

class User extends Component {
  render() {
    const { items, limit, page, total_items } = this.props.searchResult;
    return (
      <div className='animated fadeIn'>
        <Card>
          <CardHeader>
            <i className='fa fa-align-justify'></i>
            <strong> User </strong> Management &nbsp;
            <Link to='user/add' className='btn btn-primary btn-sm '>
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
  searchResult: state.user.searchResult,
  lastSearchCriteria: state.user.lastSearchCriteria
});

export default connect(
  mapStateToProps,
  { search, del, clear }
)(withRouter(User));
