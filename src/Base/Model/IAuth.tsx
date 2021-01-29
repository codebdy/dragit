import { ID } from "../../rx-drag/models/baseTypes";

export interface IAuth {
  id: ID;
  rx_slug: string;
  name: string;
  //预定义权限不可编辑和删除
  predefined?: boolean;
}
