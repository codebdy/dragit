import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, fade } from '@material-ui/core';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { closeAreaSelectAction } from 'store/designer/actions';
import { openFixedBarAction } from 'store/fixedBar/actions';
import SidebarWidthPlaceholder from 'components/Sidebar/SidebarWidthPlaceholder';
import intl from 'react-intl-universal';
import FontIcon from 'components/common/FontIcon';
import TopNavHeightPlaceholder from 'components/TopNav/TopNavHeightPlaceholder';
import classNames from 'classnames';

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

export default function PageContentDesign() {
  const classes = useStyles();
  const selectMyStore = (state: RootState) => state.designer
  const myStore = useSelector(selectMyStore)  
  const dispatch = useDispatch()
  
  const handleClose = () => {
    dispatch(closeAreaSelectAction());
    dispatch(openFixedBarAction());
  };

  return (
    <Backdrop className={classes.backdrop} open={myStore.areaSelect} onClick={handleClose}>
      <SidebarWidthPlaceholder className={classes.area}>
        <Button variant="contained" color="primary" size="large" className={classes.designButton}>
          <FontIcon iconClass="mdi mdi-pencil-ruler" className={classes.designButtonIcon} />
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
          >
            <FontIcon iconClass="mdi mdi-pencil-ruler" className={classes.designButtonIcon} />
            {intl.get('design')}
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}