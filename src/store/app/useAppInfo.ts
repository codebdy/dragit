import IAppInfo from "base/Model/IAppInfo";
import { useSelector } from "react-redux";
import { RootState } from "store";

export default function useAppInfo():IAppInfo|undefined{
  const selectMyStore = (state: RootState) => state.app
  return useSelector(selectMyStore).info;
}