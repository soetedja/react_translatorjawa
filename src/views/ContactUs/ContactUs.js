import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { clear, del, search } from '../../actions/contactUsActions';
import Alerts from '../../components/Alerts';
import DefaultTable from '../../components/DefaultTable';
const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    headerAttrs: { width: 80 }
  },
  {
    dataField: 'first_name',
    asDisplayed: true,
    text: 'First Name',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'last_name',
    text: 'Last Name',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'status',
    text: 'Status',
    align: 'center',
    filterType: 'text'
  },
  {
    dataField: 'category',
    text: 'Category',
    align: 'center',
    filterType: 'text'
  },
  {
    dataField: 'message',
    text: 'Message'
  },
  {
    dataField: 'priority',
    text: 'Priority',
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

class ContactUs extends Component {
  render() {
    const { items, limit, page, total_items } = this.props.searchResult;
    return (
      <div className='animated fadeIn'>
        <Card>
          <CardHeader>
            <i className='fa fa-align-justify'></i>
            <strong> Contact Us </strong> Management &nbsp;
            {/* <Link to='contactUs/add' className='btn btn-primary btn-sm '>
              <i className='fa fa-plus'></i> Add
            </Link> */}
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
  searchResult: state.contactUs.searchResult,
  lastSearchCriteria: state.contactUs.lastSearchCriteria
});

export default connect(
  mapStateToProps,
  { search, clear, del }
)(withRouter(ContactUs));
