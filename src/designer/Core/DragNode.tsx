import React from 'react';
import { ISchema } from './Schemas/ISchema';
import { INode } from './INode';
import { resolveNode } from "./resoveNode"

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
    const schema = this.state.schema;

    return(React.createElement(
      resolveNode(schema.name),
      {
        className:'drag-node-outline',
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