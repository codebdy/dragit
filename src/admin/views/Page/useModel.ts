import { useSelector } from "react-redux";
import { RootState } from "store";

export default function useModel(){

  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);

  return pageInStore.model
  
}