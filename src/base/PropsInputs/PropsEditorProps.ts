export interface PropsInputProps{
  field:string;
  label?:string;
  value:any;
  onChange:(field:string, value:string|boolean|number|Object|unknown)=>void;
  props?:any;
}