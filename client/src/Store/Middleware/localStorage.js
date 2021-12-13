const LocalStorageMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (
      action.type === "auth/LOGIN_SUCCESS" || 
      action.type === "auth/REGISTER_SUCCESS"
    ) {
      localStorage.setItem("token", action.payload.token);
      return next(action);
    }
    if (
      action.type === "auth/REGISTER_FAIL" ||
      action.type === "auth/AUTH_ERROR" ||
      action.type === "auth/LOGIN_FAIL" ||
      action.type === "auth/LOG_OUT" ||
      action.type === "auth/ACCOUNT_DELETED"
    ) {
      localStorage.removeItem("token");
      return next(action);
    }
    return next(action);
  };

export default LocalStorageMiddleware;
