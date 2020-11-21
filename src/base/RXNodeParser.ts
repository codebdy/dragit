import { RXNode } from "./RXNode";

export function parseRXNode<T>(json:any):RXNode<T>{
  let node = new RXNode(json)
  node.children = parseRXNodeList(json.children, node)
  return node;
}

export function parseRXNodeList<T>( jsons:any, parent?:RXNode<T> ) : Array<RXNode<T>>{
  let nodes = new Array<RXNode<T>>();
  jsons && jsons.forEach((json: any)=>{
    let node = parseRXNode<T>(json);
    node.parent = parent;
    nodes.push(node);
  })
  return nodes
}