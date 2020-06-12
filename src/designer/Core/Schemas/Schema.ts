import { ISchema } from "../Node/ISchema";

export class Schema implements ISchema{
  static idSeed:number = 1;
  id: number = 0 ;
  name:string = 'div';
  children?: ISchema[] | undefined;
  
  constructor(schema:any, children: Array<ISchema> = []) {
    this.seedId()
    this.name = schema.name;
    this.children = children;
  }

  seedId(){
    this.id = Schema.idSeed
    Schema.idSeed ++
  }
}