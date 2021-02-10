import { useMutation } from "@apollo/react-hooks";
import { useShowAppoloError } from "Store/Helpers/useInfoError";
import { FolderNode } from "./FolderNode";
import { MUTATION_UPDATE_FOLDER } from "./MediasGQLs";
import { useMediasStore } from "./MediasStore";

export function useUpdateFolder(node:FolderNode, nodeName:string){
  const mediaStore = useMediasStore();
  const [updateFolder, {error}] = useMutation(MUTATION_UPDATE_FOLDER,{
  onCompleted:(data)=>{
    node.setLoading(false);
    mediaStore.draggedFolder?.setLoading(false);
    node.setName(nodeName);
    const json = data.updateRxMediaFolder
    if(mediaStore.draggedFolder && mediaStore?.draggedFolder?.id === json?.id){
      if(!mediaStore.draggedFolder?.parent){
        mediaStore.removeFolder(mediaStore.draggedFolder);
      }
      mediaStore.draggedFolder?.moveTo(node);
      mediaStore.setDraggedFolder(undefined);
    }
  }});

  useShowAppoloError(error);

  return updateFolder;
}
