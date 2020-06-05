import React from 'react';
import { ISchema } from '../Schemas/ISchema';
import { resolveNode } from "../resoveNode"
import { resolveRule } from '../Rules/resolveRule';
import { IView } from './IView';
import { NodeContext } from './NodeContext';

interface INodeProps{
  schema:ISchema
}

interface INodeState {
  schema: ISchema,
  fsmStyle: any,
}

export class NodeView extends React.Component<INodeProps, INodeState> implements IView{
  node:NodeContext;

  constructor( props: Readonly<{schema:ISchema}> ) {
    super(props);
    this.state = { schema: props.schema, fsmStyle:{} };
    
    this.node = new NodeContext(this)
  }

  handleMouseEnter(){

  }

  handleMouseOut(){

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

        },
        onMouseEnter : this.handleMouseEnter,
        onMouseOut : this.handleMouseOut,
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