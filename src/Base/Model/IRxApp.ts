import { ID } from "../../rx-drag/models/baseTypes";
import { IAuth } from "./IAuth";
import IMenuItem from "./IMenuItem";
import { IRxPage } from "./IRxPage";

export interface IRxApp{
  //使用GUID当ID用
  id?:ID;
  name?: string;
  is_system?: boolean;
  icon?: string; 
  color?: string;
  app_type?: string;
  pages?: Array<IRxPage>;
  navigation_items?: Array<IMenuItem>;
  auths?: Array<IAuth>;
  notifications?: number;
  entry_page_id?:ID;
}