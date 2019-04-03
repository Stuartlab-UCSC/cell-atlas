import React from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import MuiTable from '@material-ui/core/Table';
// eslint-disable-next-line
import TableHead from './TableHead';
import TablePagination from './TablePagination';
// eslint-disable-next-line
import { withStyles } from '@material-ui/core/styles';

export const defaultFooterStyles = {};

class TableFooter extends React.Component {
  static propTypes = {};

  render() {
    const { options, rowCount, page, rowsPerPage, changeRowsPerPage, changePage } = this.props;

    return (
      <MuiTable>
        {options.customFooter
          ? options.customFooter(rowCount, page, rowsPerPage, changeRowsPerPage, changePage)
          : options.pagination && (
              <TablePagination
                count={rowCount}
                page={page}
                rowsPerPage={rowsPerPage}
                changeRowsPerPage={changeRowsPerPage}
                changePage={changePage}
                component={'div'}
                options={options}
              />
            )}
      </MuiTable>
    );
  }
}

export default TableFooter;
