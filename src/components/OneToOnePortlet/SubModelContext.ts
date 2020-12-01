import React from "react";


export interface SubModel{
  parentField:string|undefined,
  model:any,
}

export function creatSubModel(field:string|undefined, row:any){
  return {
    parentField:field,
    model:row,
  }
}

export const SubModelContext = React.createContext<SubModel>(creatSubModel(undefined, undefined));