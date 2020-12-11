import { IPageJumper } from "./IPageJumper";
import { ILabelItem } from "./ILabelItem";

export interface ICommand extends ILabelItem{
  slug:string,
  label:string,  
  icon?:string,
  confirmMessage?:string,
  jumpToPage?:IPageJumper,
  [key:string]:string|undefined|IPageJumper,
}