import React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import { GraphQLStore } from 'base/GraphQL/GraphQLStore';
import {observer} from 'mobx-react-lite';
import {GQLList} from './GQLList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
    },

  }),
);

export const QueriesDebug = observer((props:{
  queries?:Array<GraphQLStore>
})=>{
  const {queries} = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GQLList gqls = {queries} />
      <Grid container>
        <Grid item md={4}>
          1
        </Grid>
        <Grid item md={4}>
          2
        </Grid>
        <Grid item md={4}>
          3
        </Grid>
      </Grid>
    </div>
  )
})
