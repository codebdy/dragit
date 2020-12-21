import { models } from "mock/model";

export function addAuthsToUser(user:any) {
  if (!user) {
    return user;
  }
  let roles = models['/Model/Role'];
  user.auths = [];
  if (!user.roleIds) {
    return user;
  }

  user.roleIds && user.roleIds.forEach((roleId:any) => {
    roles.forEach((role) => {
      if (roleId === role.id) {
        user.auths = [...user.auths, ...(role.auths || [])];
      }
    });
  });

  return user;
}
