import { ISchema } from "./Schemas/ISchema";
import { INode } from "./INode";

export class Node implements INode{
  static idSeed:number = 1;
  id: number = 0 ;
  schema: ISchema;
  children?: INode[] | undefined;
  
  constructor(schema:ISchema) {
    this.seedId()
    this.schema = schema;
    //this.children = children;
  }

  seedId(){
    this.id = Node.idSeed
    Node.idSeed ++
  }

}