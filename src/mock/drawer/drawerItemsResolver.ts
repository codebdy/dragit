import drawer from "./drawerData";
import { sleep } from "../utils/sleep";

export const drawerItemsResolver = async ()=>{
  await sleep(1000);
  return drawer
}