export interface PropsInputProps{
  autoFocus?:boolean,
  label?:string;
  value:any;
  onChange:(value:string|boolean|number|Object|unknown)=>void;
  xs?:boolean | 12 | 2 | 1 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | undefined;
}