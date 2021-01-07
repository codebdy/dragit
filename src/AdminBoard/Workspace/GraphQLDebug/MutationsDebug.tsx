import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { GraphQLStore } from 'base/GraphQL/GraphQLStore';
import {observer} from 'mobx-react-lite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },

  }),
);

export const MutationsDebug = observer((props:{
  queries?:Array<GraphQLStore>
})=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
    </div>
  )
})
