
export interface RXInputProps{
  loading?:boolean;
  onChange?:(value:unknown)=>void;
  name?:string;
  error?:boolean;
  helperText?:string;
}