import { useMutation } from "@apollo/react-hooks";
import { useShowServerError } from "Store/Helpers/useInfoError";
import { FolderNode } from "./FolderNode";
import { MUTATION_REMOVE_FOLDER } from "./MediasGQLs";
import { useMediasStore } from "./MediasStore";

export function useRemoveFolder(node:FolderNode){
  const mediaStore = useMediasStore();
  const [removeFolder, {error}] = useMutation(MUTATION_REMOVE_FOLDER,{
    onCompleted:(data)=>{
      node.setLoading(false);
      const json = data?.removeRxMediaFolders;
      if(!json){
        return;
      }
      if(node?.parent){
        node?.parent?.removeChild(node)
      }
      else{
        mediaStore.removeFolder(node);
      }

    }});

  useShowServerError(error);

  return removeFolder;
}
