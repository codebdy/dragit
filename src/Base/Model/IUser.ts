import { ID } from "../../rx-drag/models/baseTypes";
import { IRxMedia } from "./IRxMedia";


export interface IUser {
  id: ID;
  login_name: string;
  is_supper?: boolean;
  is_demo?: boolean;
  avatar: IRxMedia;
  auths?: ID[];
}
