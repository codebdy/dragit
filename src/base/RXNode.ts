export class RXNode<T>{
  static idSeed:number = 1;
  id: number = 0;  
  meta:T;
  children?: Array<RXNode<T>>;

  constructor(meta:T, children?:Array<RXNode<T>> ){
    this.seedId();
    this.meta = meta;
    this.children = children;
  }

  seedId(){
    this.id = RXNode.idSeed
    RXNode.idSeed ++
  }
} 