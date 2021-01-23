import { ID } from "./graphqlTypes";

export interface IAuth {
  id: ID;
  rxSlug: string;
  name: string;
  //预定义权限不可编辑和删除
  predefined?: boolean;
}
