import { useSelector } from "react-redux";
import { RootState } from "store";

export default function useModelLoading(){

  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);

  return pageInStore.modelLoading
  
}