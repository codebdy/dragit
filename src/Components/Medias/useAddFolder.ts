import { useMutation } from "@apollo/react-hooks";
import { useShowAppoloError } from "Store/Helpers/useInfoError";
import { useLoggedUser } from "Store/Helpers/useLoggedUser";
import { FolderNode } from "./FolderNode";
import { MUTATION_ADD_FOLDER } from "./MediasGQLs";
import { useMediasStore } from "./MediasStore";

export function useAddFolder(parent?:FolderNode){
  const mediasStore = useMediasStore();
  const loggedUser = useLoggedUser();
  const [addFolder, {error, loading}] = useMutation(MUTATION_ADD_FOLDER,
    {
      variables:{
        rx_user_id:loggedUser?.meta?.id || null,
      } as any,
      onCompleted:(data)=>{
        parent?.setLoading(false);
        const json = data?.addRxMediaFolder;
        if(!json){
          console.assert(json, 'Add Folder failure:get emperyt response');
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

  useShowAppoloError(error);

  return {addFolder, loading};
}
