import { API_MAGIC_DELETE } from "APIs/magic";
import useLayzyAxios from "Data/useLayzyAxios";
import { useShowServerError } from "Store/Helpers/useInfoError";
import { RxMediaFolder } from "./constants";
import { FolderNode } from "./FolderNode";
import { useMediasStore } from "./MediasStore";

export function useRemoveFolder(node:FolderNode){
  const mediaStore = useMediasStore();
  const [removeFolder, {error}] = useLayzyAxios(API_MAGIC_DELETE,{
    onCompleted:(data)=>{
      node.setLoading(false);
      const json = (data as any)[RxMediaFolder];
      if(!json?.length){
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
