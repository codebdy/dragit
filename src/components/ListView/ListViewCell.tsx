import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { IColumn } from './IColumn';
import { resolveCellRender } from './CellRenders';

export const ListViewCell = (props: { row: any; columns: Array<IColumn>; colIndex: number; }) => {
  const { row, columns, colIndex } = props;
  const column = columns[colIndex];

  const renderCell = (column:IColumn, value: any)=>{

    const CellRender = resolveCellRender(column);
    return (
      <CellRender value= {value} {...column?.render?.props} />
    )
  }
  return (
      <TableCell {...column.props}>
        {
          renderCell(column, row[column.field])
        }
      </TableCell>
  );
};
