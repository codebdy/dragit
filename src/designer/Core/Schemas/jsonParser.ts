import { INode } from "../Node/INode";
import { Node } from "../Node/Node";

export function parseNode(json:any):INode{
  return new Node(json, parseNodes(json.children))
}

export function parseNodes( jsons:any ) : Array<INode>{
  let nodes = new Array<INode>();
  jsons && jsons.forEach((json: any)=>{
    nodes.push(parseNode(json))
  })
  return nodes
}