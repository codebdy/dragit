import { ISchema } from "./ISchema";

export class Schema implements ISchema{
  static idSeed:number = 1;
  id: number = 0 ;
  name:string = 'div';
  children?: ISchema[] | undefined;
  
  constructor(name:string) {
    this.seedId()
    this.name = name;
  }

  seedId(){
    this.id = Schema.idSeed
    Schema.idSeed ++
  }

}