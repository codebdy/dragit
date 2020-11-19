import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, fade } from '@material-ui/core';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { closeAreaSelectAction, designPageContentAction } from 'store/designer/actions';
import SidebarWidthPlaceholder from 'admin/Sidebar/SidebarWidthPlaceholder';
import intl from 'react-intl-universal';
import MdiIcon from 'components/common/MdiIcon';
import TopNavHeightPlaceholder from 'admin/TopNav/TopNavHeightPlaceholder';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'stretch',
    },
    area:{
      border: 'dashed 2px',
      borderColor: fade(theme.palette.primary.main, 0.6),
      display: 'flex',
      justifyContent :'center',
      alignItems : 'center',
      '&:hover':{
        borderColor: theme.palette.primary.main,
      }
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
    },

  }),
);

export default function AreaSelect() {
  const classes = useStyles();
  const selectMyStore = (state: RootState) => state.designer;
  const myStore = useSelector(selectMyStore);
  const selectPageStore = (state: RootState) => state.page;
  const pageStore = useSelector(selectPageStore);
  const dispatch = useDispatch();
  
  const history = useHistory();

  const handleClose = () => {
    dispatch(closeAreaSelectAction());
  };

  const handleDesignPageContent = (event:any) =>{
    dispatch(closeAreaSelectAction());
    dispatch(designPageContentAction({pageId:pageStore.pageId, pageJson:pageStore.pageJson}));
    event.stopPropagation()
  }

  const handleDesignDrawer = (event:any)=>{
    dispatch(closeAreaSelectAction());
    history.push('/drawer-edit');
    event.stopPropagation()
  }

  return (
    <Backdrop className={classes.backdrop} open={myStore.areaSelect} onClick={handleClose}>
      <SidebarWidthPlaceholder className={classes.area}>
        <Button variant="contained" color="primary" size="large" className={classes.designButton}
          onClick={handleDesignDrawer}
        >
          <MdiIcon iconClass="mdi-pencil-ruler" className={classes.designButtonIcon} />
          {intl.get('design')}
        </Button>
      </SidebarWidthPlaceholder>
      <div 
        className = {classes.rightArea}
      >
        <TopNavHeightPlaceholder></TopNavHeightPlaceholder>
        <div className={classNames(classes.pageContentArea, classes.area) }>
          <Button variant="contained" color="primary" size="large" 
            className={classNames(classes.designButton) }
            onClick={handleDesignPageContent}
          >
            <MdiIcon iconClass="mdi-pencil-ruler" className={classes.designButtonIcon} />
            {intl.get('design')}
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}