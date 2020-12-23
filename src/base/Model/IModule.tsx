import { IPage } from 'base/Model/IPage';
import { IAuth } from 'base/Model/IAuth';

export interface IModule {
  id: number;
  slug: string;
  name: string;
  moduleType: string;
  isDrawerStyle?:boolean;
  pages?: IPage[];
  entryPage?: IPage;
  auths?: IAuth[];
  entry_page_id?:number; //以后要删除该字段
}
