export interface IRxMeta{
  name:string;
  props?:{
    [key:string]: any
  };
  [key:string]:any;
}