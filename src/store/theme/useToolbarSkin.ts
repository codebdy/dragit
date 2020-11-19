import { useSelector } from "react-redux";
import { RootState } from "store";

export default function useToolbarSkin(){
  const themeSettings = (state: RootState) => state.themeSettings;
  return useSelector(themeSettings).toolbarSkin;
}
