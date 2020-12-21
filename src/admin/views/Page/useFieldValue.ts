import { SubModelContext } from "components/OneToOnePortlet/SubModelContext";
import { useContext } from "react";
import { RowModelContext } from "../../../components/OneToManyPortlet/RowModelContext";
import { FormContext } from "../../../base/FormContext";

export default function useFieldValue(field:string):[any, boolean]{
  const rowModelContext = useContext(RowModelContext);
  const subModelContext = useContext(SubModelContext);
  const formContext = useContext(FormContext);
  const loading = false//useModelLoading();

  if(!formContext.values){
    return [undefined, loading];
  }

  let value = rowModelContext.parentField ?  
      (formContext.values[rowModelContext.parentField] && 
        formContext.values[rowModelContext.parentField][rowModelContext.rowIndex] && 
        formContext.values[rowModelContext.parentField][rowModelContext.rowIndex][field]
      ) 
    :  
    formContext.values[field]

  value = subModelContext.parentField ? (
      formContext.values[subModelContext.parentField] && 
      formContext.values[subModelContext.parentField][field]
    )
    :
    value;
  
  return [value, loading];
}