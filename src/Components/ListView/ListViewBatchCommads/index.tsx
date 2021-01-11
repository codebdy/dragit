import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useListViewStore } from '../ListViewStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      flexFlow:'column',
    },
    selectedTip:{
      marginTop:theme.spacing(1),
      padding:theme.spacing(1, 0),
    },
    commands:{
      padding:theme.spacing(1, 0),
    }
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
          <div className={classes.selectedTip}>选中记录数量：<b>3</b></div>
          <div className={classes.commands}>dd{children}</div>          
        </div>
      }
    </Observer>
  );
})

export default ListViewBatchCommads;

