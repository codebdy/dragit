import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles, Grid, Typography } from '@material-ui/core';
import { GraphQLStore } from 'base/GraphQL/GraphQLStore';
import {observer} from 'mobx-react-lite';
import {GQLList} from './GQLList';
import { print, parse } from 'graphql';
import {CodeMirrorEditor} from './CodeMirrorEditor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
    },
    container:{
      flex:1,
      padding:theme.spacing(1, 1),
    },
    editorSchell:{
      display:'flex',
      flexFlow:'column',
    },

    titleText:{
      padding:theme.spacing(0,2,1,2),
      fontSize:'16px',
    }

  }),
);

export const QueriesDebug = observer((props:{
  queries?:Array<GraphQLStore>
})=>{
  const {queries} = props;
  const classes = useStyles();
  const [selected, setSelected] = useState<GraphQLStore|undefined>(/*queries&&queries.length > 0 ? queries[0] : undefined*/);
  const [graphiQL, setGraphiQL] = useState('');

  useEffect(()=>{
    try{
      setGraphiQL(selected?.gql ? print(parse(selected?.gql)) : '');
    }
    catch(e){
      console.error(e);
      setGraphiQL(selected?.gql||'');
    }
  },[selected])

  return (
    <div className={classes.root}>
      {
        queries && queries.length > 0 &&
        <GQLList gqls = {queries} selected = {selected} onSelect={(gql)=>{setSelected(gql)}} />
      }
      <div className={classes.container}>      
        <Grid container spacing={1} >
          <Grid item md={4} className={classes.editorSchell}>
            <Typography className={classes.titleText} variant="h6">GraphiQL</Typography>
            <CodeMirrorEditor value = {graphiQL} mode="graphql" onChange = {value=>setGraphiQL(value)}/>
          </Grid>
          <Grid item md={4}>
          <Typography variant="h6" className={classes.titleText}>Variables</Typography>
          ddd
          </Grid>
          <Grid item md={4}>
            3
          </Grid>
        </Grid>
        </div>
    </div>
  )
})
