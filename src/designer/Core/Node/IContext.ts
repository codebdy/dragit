import { ISchema } from "../Schemas/ISchema";
import { IView } from "./IView";
import { IRule } from "../Rules/IRule";

export interface IContext{
  handleMouseMove: (event:MouseEvent)=>void;
  handleMouseOut: (event:MouseEvent)=>void;
  handleClick: (event:MouseEvent)=>void;

  toNormalState: ()=>void;
  toActiveState: ()=>void;
  toFocusState: ()=>void;
  toDraggedState: ()=>void;
  toPreivewState: ()=>void;
  schema: ISchema;
  view: IView;
  rule:IRule;
}