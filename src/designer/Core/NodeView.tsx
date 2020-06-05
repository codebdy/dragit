import React from 'react';
import { ISchema } from './Schemas/ISchema';
import { resolveNode } from "./resoveNode"
import { resolveRule } from './Rules/resolveRule';

interface INodeProps{
  schema: ISchema
}

interface INodeState {
  schema: ISchema
}

export class NodeView extends React.Component<INodeProps, INodeState>{

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
          <NodeView key={child.id} schema={child} />
        )
      })
      )
    )

  }
}