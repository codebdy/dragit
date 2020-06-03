import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { closeAreaSelectAction } from 'store/AreaSelect/actions';
import { openFixedBarAction } from 'store/FixedBar/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      display: 'flex',
      flexFlow: 'row',
    },
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
      
    </Backdrop>
  );
}