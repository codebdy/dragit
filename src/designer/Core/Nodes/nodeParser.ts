import { INode } from "./INode";
import { Node } from "./Node";
import { ISchema } from "../Schemas/ISchema";

export function parseSchema(schema:ISchema):INode{
  return new Node(schema, parseSchemas(schema.children))
}

export function parseSchemas( schemas:Array<ISchema> = [] ) : Array<INode>{
  let nodes = new Array<INode>();
  schemas.forEach(schema=>{
    nodes.push(parseSchema(schema))
  })
  return nodes
}