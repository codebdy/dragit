import React, { useEffect, useRef } from 'react';
import { ISchema } from '../Schemas/ISchema';
import { resolveNode } from "../resoveNode"
import { resolveRule } from '../Rules/resolveRule';
import { NodeContext } from './NodeContext';
import bus, {FOCUS_NODE} from "../bus";
import { IContext } from './IContext';

interface INodeProps{
  schema:ISchema,
  contextName?:any,
}

interface INodeState {
  schema: ISchema,
  style: {[key:string]:string},
  
}


export default function NodeView(props:INodeProps){
  const [schema, setSchema] = React.useState(props.schema);
  const [style, setStyle] = React.useState({});
  const nodeEl = useRef(null);

  const getDom = ()=>{
    return nodeEl.current;
  }

  const contextName = props.contextName ? props.contextName : NodeContext;

  const [nodeContext] = React.useState(new contextName({
    setStyle:setStyle,
    setSchema:setSchema,
    dom: getDom
  }, schema));

  const focusNode = (node:IContext)=>{
    if(node.schema.id !== schema.id)
    nodeContext.toNormalState()
  }

  useEffect(() => {
    bus.on(FOCUS_NODE, focusNode)
    return () => {
      bus.off(FOCUS_NODE, focusNode)
    };
  });

  const rule =  resolveRule(schema.name);

  const handleMouseMove = (event:MouseEvent)=>{
    nodeContext.handleMouseMove(event);
  }

  const handleMouseOut = (event:MouseEvent)=>{
    nodeContext.handleMouseOut(event);
  }

  const handleClick = (event:MouseEvent)=>{
    nodeContext.handleClick(event);
  }

  return(React.createElement(
    resolveNode(schema.name),
    {
      ref:nodeEl,
      className:'drag-node-outline',
      style:{
        paddingTop : rule.editPaddingY,
        paddingBottom : rule.editPaddingY,
        paddingLeft : rule.editPaddingX,
        paddingRight : rule.editPaddingX,
        ...style,

      },
      onMouseMove : handleMouseMove,
      onMouseOut : handleMouseOut,
      onClick : handleClick,
    },
    schema.children?.map((child:ISchema)=>{
      return (
        <NodeView key={child.id} schema={child} />
      )
    })
    )
  )
}


/*
export class NodeView extends React.Component<INodeProps, INodeState> implements IView{
  nodeContext:NodeContext;

  constructor( props: Readonly<{schema:ISchema}> ) {
    super(props);
    this.state = { schema: props.schema, style:{} };
    
    this.nodeContext = new NodeContext(this, this.state.schema);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setStyle(style:{[key:string]:string}){
    this.setState({style:style})
  }

  dom(){
    return this.refs.viewDom;
  }

  componentDidMount(){
    bus.on(FOCUS_NODE,this.nodeContext.focusNode)
  }

  componentWillUnmount() {
    bus.off(FOCUS_NODE,this.nodeContext.focusNode)
  }

  handleMouseMove(event:MouseEvent){
    this.nodeContext.handleMouseMove(event);
  }

  handleMouseOut(event:MouseEvent){
    this.nodeContext.handleMouseOut(event);
  }

  handleClick(event:MouseEvent){
    this.nodeContext.handleClick(event);
  }

  render() {
    const schema = this.state.schema;
    const rule =  resolveRule(schema.name);

    return(React.createElement(
      resolveNode(schema.name),
      {
        className:'drag-node-outline',
        style:{
          ref:'viewDom',
          paddingTop : rule.editPaddingY,
          paddingBottom : rule.editPaddingY,
          paddingLeft : rule.editPaddingX,
          paddingRight : rule.editPaddingX,
          ...this.state.style,

        },
        onMouseMove : this.handleMouseMove,
        onMouseOut : this.handleMouseOut,
        onClick : this.handleClick,
      },
      schema.children?.map((child:ISchema)=>{
        return (
          <NodeView key={child.id} schema={child} />
        )
      })
      )
    )

  }
}*/