import { makeStyles, Theme, createStyles } from '@material-ui/core';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { useListViewStore } from '../ListViewStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      alignItems:'center',
    },
  })
);

const ListViewFilters = observer(React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    className,
    children,
    ...rest
  } = props
  const classes = useStyles();
  const listViewStore = useListViewStore();

  return (
    listViewStore?.selects?.length === 0
    ?<div
      className={classNames(className, classes.root)}
      {...rest}
      ref= {ref}
    >
      {children}
    </div>
    :<Fragment></Fragment>
  );
}))

export default ListViewFilters;

