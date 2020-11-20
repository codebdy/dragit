import { IMeta } from "base/IMeta";

export class RXComponent{
  static idSeed:number = 1;
  id: number = 0;  
  meta:IMeta;
  children?: Array<RXComponent>;

  constructor(meta:IMeta, children?:Array<RXComponent> ){
    this.seedId();
    this.meta = meta;
    this.children = children;
  }

  seedId(){
    this.id = RXComponent.idSeed
    RXComponent.idSeed ++
  }
} 