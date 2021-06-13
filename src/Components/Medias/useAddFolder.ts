import { API_MAGIC_POST } from "APIs/magic";
import useLayzyAxios from "Data/useLayzyAxios";
import { useShowServerError } from "Store/Helpers/useInfoError";
import { FolderNode } from "./FolderNode";
import { useMediasStore } from "./MediasStore";

export function useAddFolder(parent?:FolderNode){
  const mediasStore = useMediasStore();
  const [addFolder, {error, loading}] = useLayzyAxios(API_MAGIC_POST,
    {
      onCompleted:(data)=>{
        parent?.setLoading(false);
        const json = data as any;
        if(!json){
          console.assert(json, 'Add Folder failure:get emperty response');
          return;
        }
        const folder = new FolderNode(json.id, json.name, parent);
        parent?.addChild(folder);
        if(!parent){
          mediasStore?.addFolder(folder);
        }
      }
    }
  ); 

  useShowServerError(error);

  return {addFolder, loading};
}
