import { useSelector } from "react-redux";
import { RootState } from "store";

export default function useDesigner(){
  const selectMyStore = (state: RootState) => state.designer
  return useSelector(selectMyStore)
}
