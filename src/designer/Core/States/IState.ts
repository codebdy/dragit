export interface IState{
  handleMouseMove: (event : MouseEvent)=>void;
  handleMouseOut: (event : MouseEvent)=>void;
  handleClick: (event : MouseEvent)=>void;
  //focusNode: (nodeId: number)=>void;
  enter: ()=>void;
  leave: ()=>void;
  style:{[key:string]:string};
  className: string;
}