import { RXNode } from "./RXNode";

export function parseRXNode<T>(json:any):RXNode<T>{
  return new RXNode(json, parseRXNodeList(json.children))
}

export function parseRXNodeList<T>( jsons:any ) : Array<RXNode<T>>{
  let nodes = new Array<RXNode<T>>();
  jsons && jsons.forEach((json: any)=>{
    nodes.push(parseRXNode(json))
  })
  return nodes
}