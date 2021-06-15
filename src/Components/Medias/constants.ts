import { MagicQuery } from "Data/MagicQuery";

export const RxMedia = 'RxMedia';
export const RxMediaFolder = 'RxMediaFolder';
export const folderTreeQuery = new MagicQuery()
  .setModel(RxMediaFolder)
  .addModelCommand('tree')
  .setOrderByASC('id')