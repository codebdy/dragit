import { API_MAGIC_POST } from "APIs/magic";
import useLayzyAxios from "Data/useLayzyAxios";
import { useShowServerError } from "Store/Helpers/useInfoError";

export function useUpdateMedia(onCompleted:(data:any)=>void){
  const [updateMedia, {error}] = useLayzyAxios(API_MAGIC_POST,{
      onCompleted:onCompleted
    }
  );
  
  useShowServerError(error);
  return updateMedia
}