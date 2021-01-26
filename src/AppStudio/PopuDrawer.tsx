import React from 'react';
import {makeStyles, Theme, createStyles, Drawer, Typography, Divider} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import {observer} from 'mobx-react';
import { useAppStudioStore } from './AppStudioStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: 0,
      padding: theme.spacing(1, 2),
      minWidth:'260px',
      background: theme.palette.background.default,
      display:'flex',
      justifyContent:'space-between',
    },
  }),
);

export const PopuDrawer = observer((
  props:{
    title?:JSX.Element|string,
    titleAction?:JSX.Element,
    open:boolean,
    onClose:()=>void,
    children:any,
  }
)=>{
  const {title,titleAction,  open, onClose, children} = props;
  const classes = useStyles();
  const studioStore = useAppStudioStore();
  
  const drawerClasses = makeStyles({
    drawer:{
      marginLeft:studioStore?.verticalBarWidth,
    }})();

  return (
    <Drawer
      variant = 'temporary'
      anchor="left" 
      open={open}
      onClose = {onClose}
      classes = {{paper:drawerClasses.drawer}}
    >
      <DialogTitle disableTypography className = {classes.title}>
        <Typography variant="h6">{title}</Typography>
        {titleAction}
      </DialogTitle>
      <Divider />
      {children}
    </Drawer>
  )
})
