import React from "react";
import useCookie from "react-use-cookie";
import { api } from "../services/axios";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useCookie("role", "");
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", { first_name: "", last_name: "", username: "", uid: 0 });

  function storeToken(token) {
    setToken(token);
  }

  function logout() {
    setToken("");
    setUserInfo(undefined);
  }

  const serverCall = async ({ entity, method, data = { test: 1 } }) => {
    try {
      let requestOptions = {
        url: entity,
        method,
        redirect: "follow",
        ...(data && { data: JSON.stringify(data) }),
      };

      let response = await api({ ...requestOptions });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`خطا در انجام عملیات - ${response?.statusText}`);
      }
    } catch (e) {
      throw new Error(JSON.stringify(e) || `خطا در انجام عملیات`);
    }
  };

  const getRequest = async ({ queryKey }) => {
    let tempEntity = queryKey;
    if (Array.isArray(queryKey)) {
      tempEntity = queryKey.join("/");
    }
    tempEntity = String(tempEntity);
    try {
      return await serverCall({ entity: tempEntity, method: "get" });
    } catch (error) {
      throw new Error(error?.message || `خطا در انجام عملیات`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        storeToken,
        serverCall,
        getRequest,
        isUserLoggedIn: !!token,
        userInfo,
        setUserInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
