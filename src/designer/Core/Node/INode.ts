import { IRule } from "../Rules/IRule";
import { IMeta } from "./IMeta";
import { IView } from "./IView";

export interface INode{
  id: number;
  rule: IRule;
  meta: IMeta;
  view?: IView;
  props: {[key: string]:any};

  parent?: INode;
  children: Array<INode>;

  toNormalState: ()=>void;
  toActiveState: ()=>void;
  toFocusState: ()=>void;
  toDraggedState: ()=>void;
  toPreivewState: ()=>void;  
}