import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Observer } from 'mobx-react';
import React from 'react';
import { useListViewStore } from '../ListViewStore';
import intl from 'react-intl-universal';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
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
    className,
    children,
    ...rest
  } = props
  const classes = useStyles();
  const listViewStore = useListViewStore();
 
  return (
    <Observer>
      {()=>
        <div
          className={classNames(className, classes.root)}
          {...rest}
          ref= {ref}
        >
          <div className={classes.selectedTip}>{intl.get('records-selected')} <b>{listViewStore.selects.length}</b></div>
          <div className={classes.commands}>{children}</div>          
        </div>
      }
    </Observer>
  );
})

export default ListViewBatchCommads;

