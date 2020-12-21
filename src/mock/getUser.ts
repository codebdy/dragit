import { models } from "mock/model";
export function getUser(account:string) {
  let users = models['/Model/User'];
  if (!users) {
    return undefined;
  }

  for (var i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.login_name === account) {
      return user;
    }
  }
}
