import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { clear, del, search } from '../../actions/appSettingActions';
import Alerts from '../../components/Alerts';
import HTMLHead from '../../components/HTMLHead';
import DefaultTable from '../../components/DefaultTable';

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    headerAttrs: { width: 80 }
  },
  {
    dataField: 'key',
    asDisplayed: true,
    text: 'Key',
    sort: true,
    filterType: 'text'
  },
  {
    dataField: 'data_type',
    text: 'Data Type',
    sort: true,
    filterType: 'text',
    headerAttrs: { width: 200 }
  },
  {
    dataField: 'value',
    typeCol: 'text',
    text: 'Value',
    align: 'center',
    filterType: 'text',
    headerAttrs: { width: 110 }
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

class AppSetting extends Component {
  render() {
    const { items, limit, page, total_items } = this.props.searchResult;
    return (
      <div className='animated fadeIn'>
        <HTMLHead title='Application Setting' />
        <Card>
          <CardHeader>
            <i className='fa fa-align-justify'></i>
            <strong> Application Setting </strong> Management &nbsp;
            <Link to='appSetting/add' className='btn btn-primary btn-sm '>
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
  searchResult: state.appSetting.searchResult,
  lastSearchCriteria: state.appSetting.lastSearchCriteria
});

export default connect(
  mapStateToProps,
  { search, del, clear }
)(withRouter(AppSetting));
