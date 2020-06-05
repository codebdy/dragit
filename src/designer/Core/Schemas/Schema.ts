import { ISchema } from "./ISchema";
import { IView } from "../Node/IView";

export class Schema implements ISchema{
  static idSeed:number = 1;
  id: number = 0 ;
  name:string = 'div';
  schema: ISchema;
  children?: ISchema[] | undefined;
  view:IView | undefined;
  
  constructor(schema:any, children: Array<ISchema> = []) {
    this.seedId()
    this.schema = schema;
    this.children = children;
  }

  seedId(){
    this.id = Schema.idSeed
    Schema.idSeed ++
  }

  setView(view:IView){
    this.view = view
  }

}