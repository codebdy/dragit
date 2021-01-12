import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { useListViewStore } from '../ListViewStore';
import intl from 'react-intl-universal';
import classNames from 'classnames';
import { useDesign } from 'Design/PageEditor/useDesign';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
    },
    selectedTip:{

    },
    commands:{

    }
  })
);

const ListViewBatchCommads = observer(React.forwardRef((
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
  const {isDesigning} = useDesign();
 
  return (
    listViewStore.selects.length > 0 || isDesigning
    ? <div
        className={classNames(className, classes.root)}
        {...rest}
        ref= {ref}
      >
        <div className={classes.selectedTip}>{intl.get('records-selected')} <b>{listViewStore.selects.length}</b></div>
        <div className={classes.commands}>{children}</div>          
      </div>
    : <Fragment></Fragment>
  );
}))

export default ListViewBatchCommads;

