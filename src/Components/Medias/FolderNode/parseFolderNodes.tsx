import { FolderNode } from ".";

export function parseFolderNodes(jsonData?: Array<any>, parent?: FolderNode) {
  const folders: Array<FolderNode> = [];
  jsonData && jsonData.forEach(json => {
    const folder = new FolderNode(json.id, json.name, parent);
    folder.setChildren(parseFolderNodes(json.children, folder));
    folders.push(folder);
  });
  return folders;
}
