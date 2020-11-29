import { useContext } from "react";
import { RowModelContext } from "../../../components/OneToManyPortlet/RowModelContext";
import { useErrors } from "./Form/RXForm";

export default function useFieldError(field:string){

  const {errors} = useErrors();
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