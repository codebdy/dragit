import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { ILabelItem } from '../../base/Model/ILabelItem';
import { ICellRender } from './ICellRender';
import { resolveCellRender, resolveComponent } from 'base/RxDrag';

export const ListViewCell = (props: { row: any; columns: Array<ILabelItem>; colIndex: number; }) => {
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
  const renderSpecialCell = (render:ICellRender, value: any)=>{

    const CellRender = resolveCellRender(render.name);
    return (
      <CellRender value= {value} {...render.props} />
    )
  }
  return (
    htmlCell ?
      <TableCell {...column.props}
        dangerouslySetInnerHTML={{ __html: htmlCell }}>
      </TableCell>
      :
      <TableCell {...column.props}>
        {
          column.render && column.render.name ?
          renderSpecialCell(column.render, row[column.field])
          :
          row[column.field]
        }
      </TableCell>
  );
};
