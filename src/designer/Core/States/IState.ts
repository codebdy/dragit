export interface IState{
  handleMouseMove: (event : MouseEvent)=>void;
  handleMouseOut: (event : MouseEvent)=>void;
  handleClick: (event : MouseEvent)=>void;
  focusNode: (nodeId: number)=>void;
  style: ()=>{[key:string]:string};
  enter: ()=>void;
  leave: ()=>void;
}