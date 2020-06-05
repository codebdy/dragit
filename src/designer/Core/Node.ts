import { ISchema } from "./Schemas/ISchema";

export class Node implements ISchema{
  static idSeed:number = 1;
  id: number = 0 ;
  name:string = 'div';
  children?: ISchema[] | undefined;
  
  constructor(name:string, children:Array<ISchema>=[]) {
    this.seedId()
    this.name = name;
    this.children = children;
  }

  seedId(){
    this.id = Node.idSeed
    Node.idSeed ++
  }

}