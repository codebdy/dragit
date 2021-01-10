
export interface RXInputProps{
  value?:any;
  loading?:boolean;
  onChange?:(value:unknown)=>void;
  name?:string;
  error?:boolean;
  helperText?:string;
}