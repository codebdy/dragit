import { ISchema } from "./ISchema";

export class Schema implements ISchema{
  static idSeed:number = 1;
  id: number = 0 ;
  name:string = 'div';
  parent?: ISchema;
  children?: ISchema[] | undefined;
  
  constructor(schema:any, children: Array<ISchema> = []) {
    this.seedId()
    this.name = schema.name;
    this.children = children;

    this.children?.map(child=>{
      child.parent = this
    })
  }

  seedId(){
    this.id = Schema.idSeed
    Schema.idSeed ++
  }
}