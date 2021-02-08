import { ID } from "../../rx-drag/models/baseTypes";
import { IRxAuth } from "./IRxAuth";

export type MaxWidth = 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'false'| '' |undefined;

export interface IRxPage{
  id:ID,
  name?:string, 
  max_width?: MaxWidth;
  width?:number;
  schema?:string,//Array<IMeta>,
  auths?:IRxAuth[],
  query?:string, 
  excute_query_by_mutation?: boolean,
}