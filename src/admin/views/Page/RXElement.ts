import { IMeta } from "designer/Core/Node/IMeta";

export class RXElement{
  static idSeed:number = 1;
  id: number = 0;  
  meta:IMeta;
  children?: Array<RXElement>;

  constructor(meta:IMeta, children?:Array<RXElement> ){
    this.seedId();
    this.meta = meta;
    this.children = children;
  }

  seedId(){
    this.id = RXElement.idSeed
    RXElement.idSeed ++
  }
} 