import { FolderNode } from "./MediaFolder";
import { ID } from "rx-drag/models/baseTypes";

export function getByIdFromTree(id: ID, folders?: Array<FolderNode>): FolderNode | undefined {
  if (folders) {
    for (var i = 0; i < folders.length; i++) {
      if (folders[i].id === id) {
        return folders[i];
      }
      let searchedChild = getByIdFromTree(id, folders[i].children);
      if (searchedChild) {
        return searchedChild;
      }
    }
  }
  return undefined;
}
