import { ISchema } from "../Schemas/ISchema";
import { IView } from "./IView";

export interface IContext{
  toNormalState: ()=>void;
  toActiveState: ()=>void;
  toFocusState: ()=>void;
  toDraggedState: ()=>void;
  toPreivewState: ()=>void;
  schema: ISchema;
  view: IView;
}