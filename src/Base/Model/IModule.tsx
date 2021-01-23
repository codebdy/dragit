import { IRxPage } from 'Base/Model/IRxPage';
import { IAuth } from 'Base/Model/IAuth';
import { ID } from './graphqlTypes';

export interface IModule {
  id: ID;
  slug: string;
  name: string;
  moduleType?: string;
  isDrawerStyle?:boolean;
  pages?: IRxPage[];
  entryPage?: IRxPage;
  auths?: IAuth[];
  entry_page_id?:ID; //以后要删除该字段
}
