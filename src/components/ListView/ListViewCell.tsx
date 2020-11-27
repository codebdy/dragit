import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { ListViewMetaItem } from './ListViewMetaItem';

export const ListViewCell = (props: { row: any; columns: Array<ListViewMetaItem>; colIndex: number; }) => {
  const { row, columns, colIndex } = props;
  const column = columns[colIndex];
  const parseTemplate = () => {
    let cellValue = column.template;
    columns.forEach((col) => {
      cellValue = cellValue.replace(`{$${col.field}}`, row[col.field]);
    });
    return cellValue;
  };
  let htmlCell = '';
  if(column.template) {
    htmlCell = parseTemplate();
  }
  else if(column.isHtml){
    htmlCell = row[column.field];
  }
  return (
    htmlCell ?
      <TableCell {...column.props}
        dangerouslySetInnerHTML={{ __html: htmlCell }}>
      </TableCell>
      :
      <TableCell {...column.props}>
        {row[column.field]}
      </TableCell>
  );
};
