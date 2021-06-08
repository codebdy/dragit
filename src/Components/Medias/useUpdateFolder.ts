import { useMutation } from "@apollo/react-hooks";
import { useShowServerError } from "Store/Helpers/useInfoError";
import { MUTATION_UPDATE_FOLDER } from "./MediasGQLs";

export function useUpdateFolder(onCompleted:(data:any)=>void){
  const [updateFolder, {error}] = useMutation(MUTATION_UPDATE_FOLDER,{
  onCompleted:onCompleted});

  useShowServerError(error);

  return updateFolder;
}
