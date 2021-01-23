import { ID } from "./graphqlTypes";
import { IAuth } from "./IAuth";
import IMenuItem from "./IMenuItem";
import { IRxPage } from "./IRxPage";

export interface IRxApp{
  //使用GUID当ID用
  id?:ID;
  name?: string;
  icon?: string; 
  color?: string;
  appType?: string;
  pages?: Array<IRxPage>;
  navigationItems?: Array<IMenuItem>;
  auths?: Array<IAuth>;
  notifications?: number;
}