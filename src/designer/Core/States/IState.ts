export interface IState{
  handleMouseMove:(event:MouseEvent)=>void;
  handleMouseOut:(event:MouseEvent)=>void;
  style:()=>{[key:string]:string};
}