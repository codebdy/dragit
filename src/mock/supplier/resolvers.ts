import { sleep } from "mock/utils/sleep";
import { suppliersData } from "./data";

export const allSuppliers = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return suppliersData
}

export const supplierQueryResolvers = {
  allSuppliers,
}
