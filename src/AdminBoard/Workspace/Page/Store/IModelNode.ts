export interface IModelNode{
  setModel:(model:any)=>void;
  toFieldsGQL:()=>void;
  getModelNode:(name:string)=>IModelNode|undefined;
  toInputValue:()=>any;
  setLoading:(loading:boolean)=>void;
  clearDirty:()=>void;
  isDirty:()=>boolean|undefined;
  validate:()=>boolean;
  reset:()=>void;
}