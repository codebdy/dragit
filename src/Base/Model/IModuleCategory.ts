import { ID } from "../../rx-drag/models/baseTypes";
import { IModule } from "./IModule";

export interface IModuleCategory{
  id:ID,
  name?:string,
  modules?:Array<IModule>
}