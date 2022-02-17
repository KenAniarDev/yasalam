import React, { useMemo } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      {' '}
      <input
        placeholder='search'
        className='input input-xs mt-1'
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

const TransactionTable = ({ dataDb }) => {
  const COLUMNS = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Outlet',
      accessor: 'outletName',
    },
    {
      Header: 'Paid',
      accessor: 'totalPrice',
      Cell: ({ value }) => 'AED ' + (Math.round(value * 100) / 100).toFixed(2),
    },
    {
      Header: 'Date',
      accessor: 'date',
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => MOCK_DATA, [])
  const data = useMemo(() => dataDb, []);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    setPageSize,
    prepareRow,
    allColumns,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <div>
        <div className='flex flex-wrap'>
          {allColumns.map((column, i) => (
            <div className='form-control' key={column.id}>
              <label className='cursor-pointer label'>
                <input
                  type='checkbox'
                  checked='checked'
                  className='checkbox checkbox-accent mr-1'
                  id={column.id}
                  {...column.getToggleHiddenProps()}
                />
                <span>{column.Header}</span>
              </label>
            </div>
          ))}
          <br />
        </div>
        <table className='table w-full' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps)}
                    key={i}
                  >
                    <div style={{ display: 'flex' }}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </div>
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td {...cell.getCellProps()} key={i}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between items-center mt-4 flex-wrap'>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <div className='btn-group'>
          <button
            className='btn btn-sm btn-outline btn-wide'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            Previous Page
          </button>
          <button
            className='btn btn-sm btn-outline btn-wide'
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next Page
          </button>
        </div>

        <select
          className='select select-bordered'
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default TransactionTable;
