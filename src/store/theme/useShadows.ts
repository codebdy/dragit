import { createMuiTheme, Theme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "store";

const weakenShadow = (shadow:string, strength:number)=>{
  return shadow.replace('rgba(0,0,0,0.14)',`rgba(0,0,0,${0.14*strength/10})`)
    .replace('rgba(0,0,0,0.02)',`rgba(0,0,0,${0.02*strength/10})`)
    .replace('rgba(0,0,0,0.12)',`rgba(0,0,0,${0.12*strength/10})`);
}

const generateShadows = (theme: Theme, strength:number) => {
  return theme.shadows.reduce(function(result, item, index, array) {
    result[index] = weakenShadow(item, strength) ;
    return result;
  }, new Array<string>());
};



export default function useShadows(){
  const themeSettings = (state: RootState) => state.themeSettings;
  const commonSetings =  useSelector(themeSettings);
  const oldTheme = createMuiTheme({})

  return generateShadows(oldTheme, commonSetings.elevationStrength);
}
