import React from 'react';
import { ISchema } from '../Schemas/ISchema';
import { resolveNode } from "../resoveNode"
import { resolveRule } from '../Rules/resolveRule';
import { IView } from './IView';
import { INode } from '../INode';

interface INodeProps{
  node:INode
}

interface INodeState {
  schema: ISchema,
  fsmStyle: any,
}

export class NodeView extends React.Component<INodeProps, INodeState> implements IView{

  constructor(props: Readonly<{node:INode}>) {
    super(props);
    this.state = { schema: props.node.schema, fsmStyle:{} };
  }

  render() {
    const node = this.props.node;
    const rule =  resolveRule(node.schema.name)

    return(React.createElement(
      resolveNode(node.schema.name),
      {
        className:'drag-node-outline',
        style:{
          paddingTop : rule.editPaddingY,
          paddingBottom : rule.editPaddingY,
          paddingLeft : rule.editPaddingX,
          paddingRight : rule.editPaddingX,
        }
      },
      node.children?.map((child:INode)=>{
        return (
          <NodeView key={child.id} node={child} />
        )
      })
      )
    )

  }
}