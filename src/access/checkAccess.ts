import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 判断当前用户是否拥有具体某个权限？
 * @param loginUser 当前登录用户
 * @param needAccess 需用有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  //获取当前用户的登录权限(如果没有loginUser,则表示未登录)
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  //如果用户登录才可以访问
  if (needAccess === ACCESS_ENUM.USER) {
    //如果用户未登录，则无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //如果用户不为管理员，则无权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
