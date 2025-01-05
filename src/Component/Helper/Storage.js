const setUserData = async (userData) => {
  window.localStorage.setItem("@userData", userData);
};
const getUserdata = () => {
  return JSON?.parse(window.localStorage.getItem("@userData"));
};

const setToken = async (userToken) => {
  window.localStorage.setItem("@userToken", userToken);
};

const getToken = () => {
  return window.localStorage.getItem("@userToken");
};

const LogOut = async () => {
  return (
    window.localStorage.removeItem("@userToken"),
    localStorage.removeItem("@userData")
  );
};

export { setUserData, setToken, getToken, getUserdata, LogOut };
