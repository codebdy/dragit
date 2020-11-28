import { LoggedUser } from "base/LoggedUser";
import useAppInfo from "./useAppInfo";

export default function useLoggedUser():LoggedUser{
  const appInfo = useAppInfo();
  return new LoggedUser(appInfo?.user);
}