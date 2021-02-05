import { ID } from "../../rx-drag/models/baseTypes";

export interface IRxAuth {
  id: ID;
  rx_slug?: string;
  name?: string;
  //预定义权限不可编辑和删除
  predefined?: boolean;
  group_name?: string,
}
