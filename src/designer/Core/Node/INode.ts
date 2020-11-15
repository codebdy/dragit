import { IRule } from "../../../base/Rules/IRule";
import { IMeta } from "../../../base/IMeta";
import { IView } from "./IView";

export interface MousePoint{
  clientX:number, 
  clientY:number
}

export interface INode{
  id: number;
  rule: IRule;
  meta: IMeta;
  view?: IView;
  props: {[key: string]:any};
  label?: string;

  parent?: INode;
  children: Array<INode>;

  getProps:(
    showOutline?:boolean, 
    showPaddingX?:boolean,
    showPaddingY?:boolean,
  )=>{[key: string]:any};

  accept: (child:INode)=>boolean;

  toNormalState: ()=>void;
  toActiveState: ()=>void;
  toFocusState: ()=>void;
  toDraggedState: ()=>void;
  toPreivewState: ()=>void;
  toDragoverState: ()=>void;

  flexFlowRow:()=>boolean;
  
  moveInBottom:(target:INode)=>void;
  moveInTop:(target:INode)=>void;
  removeFormParent:()=>void;
  moveBefore:(target:INode)=>void;
  moveAfter:(target:INode)=>void;

  firstChild?: INode;
  lastChild?: INode;
  beforeBrother?: INode;
  afterBrother?: INode;

  firstChildAfterMouse: (point:MousePoint)=>INode|undefined;
  isAfterMouse: (point:MousePoint)=>boolean;

  updateProp:(field:string, value:any)=>void;
}