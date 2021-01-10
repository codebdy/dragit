export interface PropsInputProps{
  label?:string;
  value:any;
  onChange:(value:string|boolean|number|Object|unknown)=>void;
  props?:any;
}