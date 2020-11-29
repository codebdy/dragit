import { useContext } from "react";
import { RowModelContext } from "../../../components/OneToManyPortlet/RowModelContext";
import { FormContext } from "./Form/RXForm";
import useModelLoading from "./useModelLoading";

export default function useFieldValue(field:string):[any, boolean]{
  const rowModelContext = useContext(RowModelContext);
  const formContext = useContext(FormContext);
  const loading = useModelLoading();

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
  
  return [value, loading];
}