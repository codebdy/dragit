import { API_MAGIC_POST } from "APIs/magic";
import useLayzyAxios from "Data/useLayzyAxios";
import { useShowServerError } from "Store/Helpers/useInfoError";

export function useUpdateFolder(onCompleted:(data:any)=>void){
  const [updateFolder, {error}] = useLayzyAxios(API_MAGIC_POST,{
  onCompleted:onCompleted});

  useShowServerError(error);

  return updateFolder;
}
