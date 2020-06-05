import React from 'react';
import { ISchema } from './Schemas/ISchema';
import { INode } from './INode';
import { resolveNode } from "./resoveNode"
import { resolveRule } from './Rules/resolveRule';

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
    const rule =  resolveRule(schema.name)

    return(React.createElement(
      resolveNode(schema.name),
      {
        className:'drag-node-outline',
        style:{
          paddingTop : rule.editPaddingY,
          paddingBottom : rule.editPaddingY,
          paddingLeft : rule.editPaddingX,
          paddingRight : rule.editPaddingX,
        }
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