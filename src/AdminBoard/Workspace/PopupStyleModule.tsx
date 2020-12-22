import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import {observer} from "mobx-react-lite";
import { IModule } from 'base/Model/IModule';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

  }),
);

export const PopupStyleModule = observer((
  props:{
    module:IModule
  }
)=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
      Popup style module
    </div>
  )
})
