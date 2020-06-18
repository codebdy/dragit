import { IRule } from "../Rules/IRule";
import { IMeta } from "./IMeta";
import { IView } from "./IView";

export interface INode{
  id: number;
  rule: IRule;
  meta: IMeta;
  view?: IView;
  props: {[key: string]:any};
  label: string;

  parent?: INode;
  children: Array<INode>;

  accept: (child:INode)=>boolean;

  toNormalState: ()=>void;
  toActiveState: ()=>void;
  toFocusState: ()=>void;
  toDraggedState: ()=>void;
  toPreivewState: ()=>void;

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
}