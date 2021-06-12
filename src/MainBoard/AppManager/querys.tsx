import { MagicQuery } from "Data/MagicQuery";

export const queryAllApps = new MagicQuery().setModel('RxApp');
export const queryAllTemplates = new MagicQuery().setModel('RxTemplate');