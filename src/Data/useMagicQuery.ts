import  { SWRResponse } from "swr";
import { DataError } from "./DataError";
import { MegicQuery } from "./MegicQuery";
import { useSWRQuery } from "./useSWRQuery";

export function useMagicQuery<T>(queryMeta:MegicQuery):SWRResponse<T, DataError>&{loading?:boolean}{

  const rt = useSWRQuery<T>(queryMeta.toAxioConfig());

  return rt;
}