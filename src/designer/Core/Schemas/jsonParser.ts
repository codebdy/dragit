import { Schema } from "./Schema";
import { ISchema } from "./ISchema";

export function parseSchema(json:any):ISchema{
  return new Schema(json, parseSchemas(json.children))
}

export function parseSchemas( jsons:any ) : Array<ISchema>{
  let nodes = new Array<ISchema>();
  jsons && jsons.forEach((json: any)=>{
    nodes.push(parseSchema(json))
  })
  return nodes
}