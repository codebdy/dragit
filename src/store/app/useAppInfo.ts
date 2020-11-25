import { useSelector } from "react-redux";
import { RootState } from "store";

export default function useAppInfo(){
  const selectMyStore = (state: RootState) => state.app
  return useSelector(selectMyStore).info;
}