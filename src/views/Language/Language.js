import React, { Component } from 'react';
import { search, del, clear } from '../../actions/languageActions';
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
    dataField: 'code',
    text: 'Code',
    sort: true,
    filterType: 'text',
    headerAttrs: { width: 200 }
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

class Language extends Component {
  render() {
    const { items, limit, page, total_items } = this.props.searchResult;
    return (
      <div className='animated fadeIn'>
        <Card>
          <CardHeader>
            <i className='fa fa-align-justify'></i>
            <strong> Language </strong> Management &nbsp;
            <Link to='language/add' className='btn btn-primary btn-sm '>
              <i className='fa fa-plus'></i> Add
            </Link>
          </CardHeader>
          <CardBody>
            <Alerts />
            {/* <p>
              Documentation and examples for Bootstrap typography, including
              global settings, headings, body text, lists, and more.
            </p> */}
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
  searchResult: state.language.searchResult,
  lastSearchCriteria: state.language.lastSearchCriteria
});

export default connect(
  mapStateToProps,
  { search, del, clear }
)(withRouter(Language));
