import { IColumn } from "components/ListView/IColumn";

export function mediaFieldGQL(column:IColumn){
  return ` ${column.field} {
    id 
    thumbnail
  } `;
}