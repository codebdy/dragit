import React from 'react';
import { makeStyles, Theme, createStyles, List, ListItem, ListItemText } from '@material-ui/core';
import { GraphQLStore } from 'base/GraphQL/GraphQLStore';
import {observer} from 'mobx-react-lite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      heiht:'100%',
      width:'160px',
      borderRight: `1px solid ${theme.palette.divider}`,
    },

  }),
);

export const GQLList = observer((props:{
  gqls?:Array<GraphQLStore>,
  selected?:GraphQLStore,
  onSelect?:(gql:GraphQLStore)=>void,
})=>{
  const{gqls,selected, onSelect} = props;
  const classes = useStyles();
  const handleClick = (gql:GraphQLStore)=>{
    onSelect&&onSelect(gql)
  }
  return (
    <div className={classes.root}>
      <List>
        {
          gqls?.map((gql, index)=>{
            return(
              <ListItem key={index} button selected = {selected === gql} onClick={()=>handleClick(gql)}>
                <ListItemText primary={gql.name} secondary={`from ${gql.source}`} />
              </ListItem>
            )
          })
        }

      </List>
    </div>
  )
})
