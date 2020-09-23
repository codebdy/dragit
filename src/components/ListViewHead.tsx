import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel} from "@material-ui/core";
import React from "react";
import { ListViewMetaItem } from "./ListViewMetaItem";

type Order = 'asc' | 'desc';

export interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface ListViewHeadProps {
  //classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns:Array<ListViewMetaItem>;
}

export function ListViewHead(props: ListViewHeadProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columns } = props;
  const createSortHandler = (field: string) => (event: React.MouseEvent<unknown>) => {
    //onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            id = 'all'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {columns.map((headCell,index) => (
          <TableCell
            key={headCell.field + '-' + index}
            sortDirection={orderBy === headCell.field ? order : false}
          >
            <TableSortLabel
              id = {headCell.field}
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'asc'}
              onClick={createSortHandler(headCell.field)}
            >
              {headCell.label}
              {orderBy === headCell.field ? (
                <span>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
