import React from "react";


export interface RowModel{
  parentField:string|undefined,
  rowIndex:number,
  model:any,
}

export function creatRowModel(field:string|undefined, index:number, row:any){
  return {
    parentField:field,
    rowIndex:index,
    model:row,
  }
}

export const RowModelContext = React.createContext<RowModel>(creatRowModel(undefined, 0, undefined));