import { IMedia } from "./IMedia";


export interface IUser {
  id: string;
  login_name: string;
  is_supper?: boolean;
  is_demo?: boolean;
  avatar: IMedia;
  auths?: string[];
}
