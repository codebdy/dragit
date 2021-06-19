import { MagicQueryBuilder } from "Data/MagicQueryBuilder";
import { RxApp, RxTemplate } from "modelConstants";

export const queryAllApps = new MagicQueryBuilder().setModel(RxApp);
export const queryAllTemplates = new MagicQueryBuilder()
  .setModel(RxTemplate)
  .addRelation('media');
