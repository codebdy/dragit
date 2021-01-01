import { ID } from "./graphqlTypes";
import { IModule } from "./IModule";

export interface IModuleCategory{
  id:ID,
  name?:string,
  modules?:Array<IModule>
}