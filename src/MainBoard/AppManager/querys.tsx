import { MagicQueryBuilder } from "Data/MagicQueryBuilder";

export const queryAllApps = new MagicQueryBuilder().setModel('RxApp');
export const queryAllTemplates = new MagicQueryBuilder().setModel('RxTemplate');