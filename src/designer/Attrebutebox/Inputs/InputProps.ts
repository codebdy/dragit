export interface InputProps{
  field:string;
  value:any;
  onChange:(field:string, value:string|boolean|number|Object|unknown)=>void;
  schema?:any;
}