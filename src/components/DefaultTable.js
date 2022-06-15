import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { connect } from 'react-redux';
import {
  Button,
  Badge,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
  <li
    key={text}
    role='presentation'
    className='dropdown-item'
    style={{ cursor: 'pointer' }}
    onMouseDown={e => {
      e.preventDefault();
      onSizePerPageChange(page);
    }}
  >
    <span tabIndex='-1' role='menuitem' data-page={page}>
      {text}
    </span>
  </li>
);

let _defaultSorted = [
  {
    dataField: 'id',
    order: 'asc'
  }
];

class DefaultTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      modal: { name: '' },
      warning: false
    };
    if (this.props.defaultSorted) {
      _defaultSorted = this.props.defaultSorted;
    }
  }

  actionFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          lineHeight: 'normal'
        }}
      >
        <Link
          to={this.props.path + `/${row.id}`}
          className='btn btn-primary btn-sm'
        >
          <i className='fa fa-pencil'></i>&nbsp;Edit
        </Link>
        <Button
          color='danger'
          onClick={() => this.toggleWarning(row)}
          className='btn-sm mr-1'
        >
          <i className='fa fa-trash-o'></i>&nbsp;Delete
        </Button>
      </div>
    );
  };

  boolOptions = {
    0: 'No',
    1: 'Yes'
  };

  statusOptions = this.props.statuses.reduce(
    (acc, cur) => ({ ...acc, [cur.id]: cur.name }),
    {}
  );
  languageOptions = this.props.languages.reduce(
    (acc, cur) => ({ ...acc, [cur.name]: cur.name }),
    {}
  );

  statusFormatter = (cell, row, rowIndex, formatExtraData) => {
    let status = this.props.statuses.find(x => x.id === cell);
    if (status) return <Badge color={status.type}>{status.name}</Badge>;
  };

  boolFormatter = (cell, row, rowIndex, formatExtraData) => {
    switch (cell) {
      case false:
      case 0:
        return <Badge color='danger'>No</Badge>;
      case true:
      case 1:
        return <Badge color='success'>Yes</Badge>;
      default:
        break;
    }
  };

  componentDidMount() {
    this.columnsFormatter();
  }

  componentDidUpdate() {
    this.columnsFormatter();
  }

  componentWillUnmount() {
    this.props.clear('search');
    // this.source.cancel('Operation canceled by the user.');
  }

  columnsFormatter = () => {
    for (var col of this.props.columns) {
      switch (col.typeCol) {
        case 'action':
          col.formatter = this.actionFormatter;
          break;
        case 'status':
          col.formatter = this.statusFormatter;
          break;
        case 'bool':
          col.formatter = this.boolFormatter;
          break;
        default:
          break;
      }

      switch (col.filterType) {
        case 'text':
          col.filter = textFilter({
            placeholder: ' ',
            defaultValue: ''
          });
          break;
        case 'bool':
          col.filter = selectFilter({
            options: this.boolOptions
          });
          break;
        case 'status':
          col.filter = selectFilter({
            options: this.statusOptions
          });
          break;
        case 'language':
          col.filter = selectFilter({
            options: this.languageOptions
          });
          break;

        default:
          break;
      }
    }
  };
  asDisplayed = this.props.columns.find(c => c.asDisplayed === true).dataField;
  toggleWarning = (row = {}) => {
    this.setState({
      modal: { id: row.id, text: row[this.asDisplayed] },
      warning: !this.state.warning
    });
  };

  doDelete = id => {
    this.props.delete(id).then(res => {
      this.setState({
        warning: !this.state.warning
      });
      this.props.searchApi(this.props.lastSearchCriteria);
    });
  };

  handleTableChange = (
    type,
    { page, sizePerPage, filters, sortField, sortOrder, cellEdit }
  ) => {
    let criteria = this.props.lastSearchCriteria.use
      ? this.props.lastSearchCriteria
      : {
          page,
          sizePerPage,
          filters,
          sortField,
          sortOrder,
          cellEdit
        };
    this.props.searchApi(criteria);
  };
  render() {
    return (
      <div>
        <PaginationProvider
          pagination={paginationFactory({
            custom: true,
            page: this.props.page,
            sizePerPage: this.props.sizePerPage,
            totalSize: this.props.totalSize,
            sizePerPageOptionRenderer: sizePerPageOptionRenderer
          })}
        >
          {({ paginationProps, paginationTableProps }) => (
            <div>
              <BootstrapTable
                remote
                striped={true}
                hover
                keyField='id'
                data={this.props.data}
                columns={this.props.columns}
                onTableChange={this.handleTableChange}
                bordered={false}
                defaultSorted={_defaultSorted}
                filter={filterFactory()}
                {...paginationTableProps}
              />
              <nav className='' aria-label='pagination'>
                <SizePerPageDropdownStandalone {...paginationProps} />
                <PaginationTotalStandalone {...paginationProps} />
                <PaginationListStandalone {...paginationProps} />
              </nav>
              <Modal
                isOpen={this.state.warning}
                toggle={this.toggleWarning}
                className={'modal-warning ' + this.props.className}
              >
                <ModalHeader toggle={this.toggleWarning}>
                  Delete Confirmation
                </ModalHeader>
                <ModalBody>
                  Are you sure want to delete '{this.state.modal.text}'?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color='warning'
                    onClick={() => this.doDelete(this.state.modal.id)}
                  >
                    Delete
                  </Button>{' '}
                  <Button color='secondary' onClick={this.toggleWarning}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          )}
        </PaginationProvider>
      </div>
    );
  }
}

DefaultTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  totalSize: PropTypes.number,
  searchApi: PropTypes.func.isRequired,
  defaultSorted: PropTypes.array
};

DefaultTable.defaultProps = {
  page: 1,
  sizePerPage: 10
};

const mapStateToProps = state => ({
  statuses: state.status.all,
  languages: state.language.all
});

export default connect(
  mapStateToProps,
  null
)(DefaultTable);
