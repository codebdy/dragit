import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { RowModelContext } from "./RowModelContext";

export default function useFieldValue(field:string){
  const modelContext = useContext(RowModelContext);

  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);

  if(!pageInStore?.model){
    return undefined;
  }

  let value = modelContext.parentField ?  
      (pageInStore.model[modelContext.parentField] && 
        pageInStore.model[modelContext.parentField][modelContext.rowIndex] && 
        pageInStore.model[modelContext.parentField][modelContext.rowIndex][field]
      ) 
    :  
    pageInStore.model[field]

  return value;
}