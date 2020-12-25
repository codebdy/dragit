import { IMeta } from "base/Model/IMeta";

export interface IColumn{
  field:string;
  label:string;
  render?:IMeta;
  props?:any;
  template?:string;
}