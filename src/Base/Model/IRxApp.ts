import IMenuItem from "./IMenuItem";
import { IRxPage } from "./IRxPage";

export interface IRxApp{
  rxSlug?: string;
  name?: string;
  icon?: string; 
  color?: string;
  appType?: string;
  pages?: Array<IRxPage>;
  navigationItems?: Array<IMenuItem>;
  auths?: Array<string>;
}