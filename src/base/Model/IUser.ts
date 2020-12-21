import { IMedia } from "./IMedia";


export interface IUser {
  id: number;
  login_name: string;
  is_supper?: boolean;
  is_demo?: boolean;
  avatar: IMedia;
  auths?: string[];
}
