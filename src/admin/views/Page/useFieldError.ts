import { useContext } from "react";
import { RowModelContext } from "../../../components/OneToManyPortlet/RowModelContext";
import { useFormContext } from "./Form/useFormContext";

export default function useFieldError(field:string){

  const {errors} = useFormContext();
  const modelContext = useContext(RowModelContext);

  if(!errors){
    return undefined;
  }

  let error = modelContext.parentField ?  
      (errors[modelContext.parentField] && 
        errors[modelContext.parentField][modelContext.rowIndex] && 
        errors[modelContext.parentField][modelContext.rowIndex][field]
      ) 
    :  
    errors[field]
  return error;
}