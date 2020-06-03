import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';

import SidebarWidthPlaceholder from 'components/Sidebar/SidebarWidthPlaceholder';
import intl from 'react-intl-universal';

import TopNavHeightPlaceholder from 'components/TopNav/TopNavHeightPlaceholder';
import classNames from 'classnames';
import Scrollbar from 'components/common/Scrollbar';
import Spacer from 'components/common/Spacer';
import { cancelPageContentAction, savePageContentAction } from 'store/designer/actions';
import { openFixedBarAction } from 'store/fixedBar/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'stretch',
      background: 'rgba(0, 0, 0, 0.9)'
    },
    area:{
      border: '0',
    },
    rightArea:{
      flex:1,
      display:'flex',
      flexFlow:'column',
      justifyContent: 'stretch',
    },
    designButton:{
      boxShadow: theme.shadows[10],
    },

    designButtonIcon:{
      marginRight: theme.spacing(1),
    },
    pageContentArea:{
      flex:1,
      background: theme.palette.background.default,
      overflow: 'auto',
      display:'flex',
      flexFlow:'column',
    },

    cancelButon:{
      color:'#fff',
    },

    saveButon:{
      color:'#fff',
      background:theme.palette.primary.main,
      '&:hover':{
        background:theme.palette.primary.dark,
      }
    },

  }),
);

export default function PageContentDesign() {
  const classes = useStyles();
  const selectMyStore = (state: RootState) => state.designer
  const myStore = useSelector(selectMyStore)  
  const dispatch = useDispatch()
  
  const handleCancel = () => {
    dispatch(cancelPageContentAction());
    dispatch(openFixedBarAction());
  };

  const handleSave = () => {
    dispatch(savePageContentAction());
    dispatch(openFixedBarAction());
  };

  return (
    <Backdrop className={classes.backdrop} open={myStore.pageContentDesign}>
      <SidebarWidthPlaceholder className={classes.area}>
        
      </SidebarWidthPlaceholder>
      <div 
        className = {classes.rightArea}
      >
        <TopNavHeightPlaceholder>
          <Spacer></Spacer>
          <Button className={classes.cancelButon} onClick={handleCancel}>
            {intl.get('cancel')}
          </Button>
          <Button className={classes.saveButon} onClick={handleSave}>
          {intl.get('save')}
          </Button>
        </TopNavHeightPlaceholder>
        <div className={classNames(classes.pageContentArea, classes.area) }>
          <Scrollbar permanent>
            <div style={{height:'1500px'}}>
              ewewe
            </div>

          </Scrollbar>
        </div>
      </div>
    </Backdrop>
  );
}