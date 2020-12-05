import { IModule } from "./IModule";

export interface IModuleCategory{
  id:number,
  name?:string,
  modules?:Array<IModule>
}