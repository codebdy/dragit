export interface IModelNode{
  toFieldsGQL:()=>void;
  getModelNode:(name:string)=>IModelNode|undefined;
  toInputValue:()=>any;
}