import { MagicQueryBuilder } from "Data/MagicQueryBuilder";
import { RxTemplate } from "MainBoard/TemplateManager/constants";

export const queryAllApps = new MagicQueryBuilder().setModel('RxApp');
export const queryAllTemplates = new MagicQueryBuilder()
  .setModel(RxTemplate)
  .addRelation('media');
