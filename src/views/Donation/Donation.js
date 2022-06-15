import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { clear, del, search } from '../../actions/donationActions';
import Alerts from '../../components/Alerts';
import DefaultTable from '../../components/DefaultTable';
import HTMLHead from '../../components/HTMLHead';
const columns = [
  {
    dataField: 'id',
    text: 'ID',
    asDisplayed: true,
    sort: true,
    headerAttrs: { width: 80 }
  },
  {
    dataField: 'donor_id',
    text: 'Name',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'method',
    text: 'Method',
    sort: true,
    filterType: 'text',
    headerAttrs: { width: 200 }
  },
  {
    dataField: 'amount',
    text: 'Amount',
    sort: true,
    filterType: 'text',
    headerAttrs: { width: 200 }
  },
  {
    dataField: 'description',
    typeCol: 'text',
    text: 'Description',
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

class Donation extends Component {
  render() {
    const { items, limit, page, total_items } = this.props.searchResult;
    return (
      <div className='animated fadeIn'>
        <HTMLHead title='Donation' />
        <Card>
          <CardHeader>
            <i className='fa fa-align-justify'></i>
            <strong> Donation </strong> Management &nbsp;
            <Link to='donation/add' className='btn btn-primary btn-sm '>
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
  searchResult: state.donation.searchResult,
  lastSearchCriteria: state.donation.lastSearchCriteria
});

export default connect(
  mapStateToProps,
  { search, clear, del }
)(withRouter(Donation));
