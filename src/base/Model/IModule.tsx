import { IPage } from 'base/Model/IPage';
import { IAuth } from 'base/Model/IAuth';

export interface IModule {
  id: number;
  slug: string;
  name: string;
  moduleType: string;
  pages?: IPage[];
  entryPage?: IPage;
  auths?: IAuth[];
  entryPageId?:number; //以后要删除该字段
}
