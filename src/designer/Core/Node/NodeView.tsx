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
  style: {[key:string]:string},
}

export class NodeView extends React.Component<INodeProps, INodeState> implements IView{
  nodeContext:NodeContext;

  constructor( props: Readonly<{schema:ISchema}> ) {
    super(props);
    this.state = { schema: props.schema, style:{} };
    
    this.nodeContext = new NodeContext(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }

  setStyle(style:{[key:string]:string}){
    this.setState({style:style})
  }

  handleMouseMove(event:MouseEvent){
    this.nodeContext.handleMouseMove(event)
  }

  handleMouseOut(event:MouseEvent){
    this.nodeContext.handleMouseOut(event)
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
          ...this.state.style,

        },
        onMouseMove : this.handleMouseMove,
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