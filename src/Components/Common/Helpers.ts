import { createId } from "../../Base/creatId";

export function addTempIdToTable(rows:Array<any>):Array<any>{
  return rows.map((item:any)=>{
    return {...item, id:item.id? item.id: createId()}
  })
}

export function removeTempIdToTable(rows:Array<any>):Array<any>{
  return rows.map((row:any)=>{
    const newId = (row.id && row.id.toString().startsWith('TEMP-'))? undefined: row.id;
    return {...row, id: newId }
  })
}
