export default interface IMenuItem{
  id: number,
  type: "group" | "subheader" | "divider" | "item",
  title?:string,
  icon?:string,
  badge?:{
    isBound:false,
    text?:string,
    field?:string,
    props:any
  },
  chip?:{
    props:any
  },
  children: Array<IMenuItem>,
  to?: string,
  [key:string]:any,
}