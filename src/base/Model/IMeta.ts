export interface IMeta{
  name:string,
  props?:{[key:string]: any},
  designProps?:{[key:string]: any},
  field?:string,
  auths?:string[],
}