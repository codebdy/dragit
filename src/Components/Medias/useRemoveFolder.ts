import { API_MAGIC_DELETE } from "APIs/magic";
import useLayzyAxios from "Data/useLayzyAxios";
import { useShowServerError } from "Store/Helpers/useInfoError";
import { mutate } from "swr";
import { folderTreeQuery,  } from "./querys";
import { FolderNode } from "./FolderNode";

export function useRemoveFolder(node:FolderNode){
  const [removeFolder, {error}] = useLayzyAxios(API_MAGIC_DELETE,{
    onCompleted:(data)=>{
      node.setLoading(false);
      mutate(folderTreeQuery.toUrl());
    }});

  useShowServerError(error);

  return removeFolder;
}
