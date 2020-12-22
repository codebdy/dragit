import { RowModelContext } from "components/OneToManyPortlet/RowModelContext";
import { SubModelContext } from "components/OneToOnePortlet/SubModelContext";
import { useContext } from "react";

export default function useFieldName(field:string){

  const modelContext = useContext(RowModelContext);
  const subModelContext = useContext(SubModelContext);
  let fieldName = modelContext.parentField ? `${modelContext.parentField}[${modelContext.rowIndex}].${field}`: field;

  fieldName = subModelContext.parentField ? `${subModelContext.parentField}.${field}` : fieldName;
  return fieldName;
}