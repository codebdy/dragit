import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { RowModelContext } from "./RowModelContext";

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