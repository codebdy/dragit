import { useSelector } from "react-redux";
import { RootState } from "store";

export default function useError(){
  const selectMyStore = (state: RootState) => state.error
  return useSelector(selectMyStore).errorMessage;
}
