import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import {observer} from "mobx-react-lite";
import { IModule } from 'base/Model/IModule';
import { Fragment } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

  }),
);

export const JumpStyleModule = observer((
  props:{
    module:IModule
  }
)=>{
  const {module} = props;

  const classes = useStyles();
  return (
    <Fragment>
      Jump Style Module
    </Fragment>
  )
})
