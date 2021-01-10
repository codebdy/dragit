import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useListViewStore } from '../ListViewStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
    },
  })
);

const ListViewBatchCommads = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    children,
    ...rest
  } = props
  const classes = useStyles();
  const listViewStore = useListViewStore();
 
  return (
    <Observer>
      {()=>
        <div
          className={classes.root}
          {...rest}
          ref= {ref}
        >
          ddddd
          {children}
        </div>
      }
    </Observer>
  );
})

export default ListViewBatchCommads;

