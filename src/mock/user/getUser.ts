import users from "../data/users";

export function getUser(account:string) {
  for (var i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.login_name === account) {
      return user;
    }
  }
}
