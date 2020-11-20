import { RXComponent } from "./RXComponent";

export function parseComponent(json:any):RXComponent{
  return new RXComponent(json, parseComponents(json.children))
}

export function parseComponents( jsons:any ) : Array<RXComponent>{
  let nodes = new Array<RXComponent>();
  jsons && jsons.forEach((json: any)=>{
    nodes.push(parseComponent(json))
  })
  return nodes
}