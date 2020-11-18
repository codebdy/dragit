import { useSelector } from "react-redux";
import { RootState } from "store";

export default function useSidebarSkin(){
  const themeSettings = (state: RootState) => state.themeSettings;
  return useSelector(themeSettings).siderbarSkin;
}
