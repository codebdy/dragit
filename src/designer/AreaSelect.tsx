import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { closeAreaSelectAction } from 'store/AreaSelect/actions';
import { openFixedBarAction } from 'store/FixedBar/actions';
import SidebarWidthPlaceholder from 'components/Sidebar/SidebarWidthPlaceholder';
import intl from 'react-intl-universal';
import FontIcon from 'components/common/FontIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'stretch',
    },
    sidebarArea:{
      border: 'dashed 2px',
      borderColor: theme.palette.primary.main,
      display: 'flex',
      justifyContent :'center',
      alignItems : 'center',
    },
    rightArea:{
      flex:1,
    },
    designButton:{
      boxShadow: theme.shadows[6],
    },

    designButtonIcon:{
      marginRight: theme.spacing(1),
    }
  }),
);

export default function AreaSelect() {
  const classes = useStyles();
  const selectMyStore = (state: RootState) => state.areaSelect
  const myStore = useSelector(selectMyStore)  
  const dispatch = useDispatch()
  
  const handleClose = () => {
    dispatch(closeAreaSelectAction());
    dispatch(openFixedBarAction());
  };

  return (
    <Backdrop className={classes.backdrop} open={myStore.open} onClick={handleClose}>
      <SidebarWidthPlaceholder className={classes.sidebarArea}>
        <Button variant="contained" color="primary" size="large" className={classes.designButton}>
          <FontIcon iconClass="mdi mdi-pencil-ruler" className={classes.designButtonIcon} />
          {intl.get('design')}
        </Button>
      </SidebarWidthPlaceholder>
      <div 
        className = {classes.rightArea}
      ></div>
    </Backdrop>
  );
}