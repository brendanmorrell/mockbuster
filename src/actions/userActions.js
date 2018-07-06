export const logoutUser = (uid = null) => ({
  type: 'LOGOUT_USER',
  payload: uid,
});
