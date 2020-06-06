import { ISchema } from "../Schemas/ISchema";

export interface IContext{
  toNormalState: ()=>void;
  toActiveState: ()=>void;
  toFocusState: ()=>void;
  toDraggedState: ()=>void;
  toPreivewState: ()=>void;
  schema: ISchema;
}