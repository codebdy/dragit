import { INode } from "./INode";

export class Node implements INode{
  static idSeed:number = 1;
  id: number = 0 ;
  name:string = 'div';
  children?: INode[] | undefined;
  
  constructor() {
    this.seedId()
  }

  seedId(){
    this.id = Node.idSeed
    Node.idSeed ++
  }

}