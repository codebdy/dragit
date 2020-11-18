import { useSelector } from "react-redux";
import { RootState } from "store";

export const LIGHT = "light";
export const DARK = "dark";

export default function useThemeSettings(){
  const themeSettings = (state: RootState) => state.themeSettings;
  return useSelector(themeSettings);
}
