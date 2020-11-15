import { useSelector } from "react-redux";
import { RootState } from "store";

export default function useFieldValue(field:string){
  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);
  return pageInStore?.model && pageInStore?.model[field];
}