import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";
import { ListViewColumn } from "./ListViewColumn";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

interface ListViewHeadProps {
  //classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns:Array<ListViewColumn>;
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
        {columns.map((headCell) => (
          <TableCell
            key={headCell.field}
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
