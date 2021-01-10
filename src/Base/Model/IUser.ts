import { ID } from "./graphqlTypes";
import { IMedia } from "./IMedia";


export interface IUser {
  id: ID;
  login_name: string;
  is_supper?: boolean;
  is_demo?: boolean;
  avatar: IMedia;
  auths?: string[];
}
