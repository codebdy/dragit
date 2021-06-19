import { MagicQueryBuilder } from "Data/MagicQueryBuilder";
import { RxMediaFolder } from "modelConstants";

export const folderTreeQuery = new MagicQueryBuilder()
  .setModel(RxMediaFolder)
  .setTreeCommand()
  .setOrderByASC('id')