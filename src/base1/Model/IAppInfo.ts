export default interface IAppInfo {
  authToken: string;
  user: any;
  unreadMessagesCount:number;
  [key:string]:any;
}
