import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { nodeMap } from "./nodeMap"
import { ISchema } from './Schemas/ISchema';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outline:{
      outline:"#5d78ff dashed 1px",
    }
  }),
);

export default function NodeView(props:{schema:ISchema}){
  const {schema} = props;
  const classes = useStyles();
  const node = nodeMap[schema.name] ? nodeMap[schema.name] : schema.name

  return (
    React.createElement(
      node,
      {
        className:classes.outline,
      },
      schema.children?.map((child:ISchema)=>{
        return (
          <NodeView key={child.id} schema={child} />
        )
      })
    )

  )
}
