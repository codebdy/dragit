import roles from "mock/user/rolesData";

export function addAuthsToUser(user:any) {
  if (!user) {
    return user;
  }
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
