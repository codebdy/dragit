import { RXElement } from "./RXElement";

export function parseNode(json:any):RXElement{
  return new RXElement(json, parseNodes(json.children))
}

export function parseNodes( jsons:any ) : Array<RXElement>{
  let nodes = new Array<RXElement>();
  jsons && jsons.forEach((json: any)=>{
    nodes.push(parseNode(json))
  })
  return nodes
}