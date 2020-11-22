export class RXNode<T>{
  static idSeed:number = 1;
  id: number = 0;  
  meta!: T;
  children: Array<RXNode<T>>;
  parent?:RXNode<T>;

  static make<T>(meta:T){
    let node = new RXNode<T>();
    node.seedId();      
    node.meta = meta;
    const meteChildren = (meta as any).children as Array<T>|undefined;
    node.children = [];
    meteChildren?.forEach(child=>{
      let childNode = RXNode.make<T>(child);
      childNode.parent = node;
      node.children.push(childNode);
    })

    return node;
  }

  constructor(){
    this.children = [];
  }

  seedId(){
    this.id = RXNode.idSeed
    RXNode.idSeed ++
  }

  //完全复制包括ID的复制，META并没有被复制
  copy(){
    let copy = new RXNode<T>();
    copy.meta = this.meta;
    copy.id = this.id;
    copy.children = [];
    this.children.forEach(child=>{
      copy.children.push(child.copy());
    })

    return copy;
  }

  getMeta(id:number):T|undefined{
    if(id === this.id){
      return this.meta;
    }
    for(var i = 0; i < this.children.length; i ++){
      const child = this.children[i];
      let childMeta = child.getMeta(id);
      if(childMeta){
        return childMeta
      }
    }

    return undefined;
  }

} 