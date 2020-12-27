import drawer from "./drawerData";
import { sleep } from "../sleep";

export const drawerItemsResolver = async ()=>{
  await sleep(1000);
  return drawer
}