import { IRxPage } from 'Base/Model/IRxPage';
import { IRxAuth } from 'Base/Model/IRxAuth';
import { ID } from '../../rx-drag/models/baseTypes';

export interface IModule {
  id: ID;
  slug: string;
  name: string;
  moduleType?: string;
  isDrawerStyle?:boolean;
  pages?: IRxPage[];
  entryPage?: IRxPage;
  auths?: IRxAuth[];
  entry_page_id?:ID; //以后要删除该字段
}
