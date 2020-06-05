import React from 'react';
import { ISchema } from './Schemas/ISchema';
import { INode } from './INode';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { resolveNode } from "./resoveNode"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outline:{
      outline:"#5d78ff dashed 1px",
    }
  }),
);

interface INodeProps{
  schema: ISchema
}

interface INodeState {
  schema: ISchema
}

export class DragNode extends React.Component<INodeProps, INodeState> implements INode{

  constructor(props: Readonly<{schema:ISchema}>) {
    super(props);
    this.state = { schema: props.schema };
  }

  render() {
    const classes = useStyles();
    const schema = this.state.schema;

    return(React.createElement(
      resolveNode(schema.name),
      {
        className:classes.outline,
      },
      schema.children?.map((child:ISchema)=>{
        return (
          <DragNode key={child.id} schema={child} />
        )
      })
      )
    )

  }
}