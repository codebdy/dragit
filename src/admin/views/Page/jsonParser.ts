import { RXElement } from "./RXElement";

export function parseElement(json:any):RXElement{
  return new RXElement(json, parseElements(json.children))
}

export function parseElements( jsons:any ) : Array<RXElement>{
  let nodes = new Array<RXElement>();
  jsons && jsons.forEach((json: any)=>{
    nodes.push(parseElement(json))
  })
  return nodes
}