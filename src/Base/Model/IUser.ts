import { ID } from "../../rx-drag/models/baseTypes";
import { IRxMedia } from "./IRxMedia";


export interface IUser {
  id: ID;
  loginName: string;
  isSupper?: boolean;
  isDemo?: boolean;
  avatar: IRxMedia;
  auths?: ID[];
}
