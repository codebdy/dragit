import  { SWRResponse } from "swr";
import { DataError } from "./DataError";
import { MagicQueryBuilder } from "./MagicQueryBuilder";
import { Paginator } from "./Paginator";
import { useSWRQuery } from "./useSWRQuery";

export function useMagicQuery<T>(queryMeta?:MagicQueryBuilder, options?:any):SWRResponse<{data:T, pagination?:Paginator}, DataError>&{loading?:boolean}{

  const rt = useSWRQuery<{data:T}>(queryMeta?.toAxioConfig(), options);

  return rt;
}