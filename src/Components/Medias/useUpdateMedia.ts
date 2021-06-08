import { useMutation } from "@apollo/react-hooks";
import { useShowServerError } from "Store/Helpers/useInfoError";
import { MUTATION_UPDATE_MEDIA } from "./MediasGQLs";

export function useUpdateMedia(onCompleted:(data:any)=>void){
  const [updateMedia, {error}] = useMutation(MUTATION_UPDATE_MEDIA,{
      errorPolicy:'all',
      onCompleted:onCompleted
    }
  );
  
    useShowServerError(error);
    return updateMedia
}