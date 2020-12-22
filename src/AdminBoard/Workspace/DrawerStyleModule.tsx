import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import {observer} from "mobx-react-lite";
import { ModuleProps } from './common/ModuleProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

  }),
);

export const DrawerStyleModule = observer((
  props:ModuleProps
)=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
      Dawer Styled
    </div>
  )
})
