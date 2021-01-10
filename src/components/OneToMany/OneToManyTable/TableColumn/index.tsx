import { createStyles, makeStyles, TableCell, Theme } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      position:'relative',
    },
    label: {
      position:'absolute',
      top:'0',
      left:'0',
      color:fade(theme.palette.primary.main, 0.8),
    },
  }),
);

const TableColumn = React.forwardRef((props:any, ref:any)=>{
  const {label, className, isDesigning, sortable, children, ...rest} = props;
  const classes = useStyles();

  return (
    <TableCell className = {classNames({[classes.root]:isDesigning}, className)} {...rest} ref={ref}>
      {isDesigning&&<div className={classes.label}>{label} </div>}
      {children}
    </TableCell> 
  )
})

export default TableColumn;