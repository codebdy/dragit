import { IMeta } from 'base/Model/IMeta';
import { RXNodeRoot } from 'base/RXNode/Root';
import { RXNode } from 'base/RXNode/RXNode';
import React, { useEffect, useState } from 'react';
import ComponentView from './ComponentView';


function makeCanvas(){
  return new RXNodeRoot<IMeta>(
    {
      name:'Canvas'
    }
  )
}

export default function DragRXEditor(
  props:{
    metas:Array<IMeta>
  }
){
  const {metas} = props;
  const [canvas, setCanvas] = useState<RXNodeRoot<IMeta>>(makeCanvas());
  const [selectedNode, setSelectedNode] = useState<RXNode<IMeta>>();

  useEffect(()=>{
    let newCanvas = makeCanvas();
    newCanvas.parse(metas);
    setCanvas(newCanvas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[metas])

  return (
    <ComponentView 
      node = {canvas}
      selectedNode = {selectedNode}
      onSelectNode = {(node)=>{setSelectedNode(node)}}
    />
  )
}
