import React , { useContext} from 'react'
import jwtDecode from "jwt-decode";
import { AuthContext } from "./context";


import authStorage from "./storage";

export const useAuth = () => {

  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
