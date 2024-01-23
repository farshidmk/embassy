import React from "react";
import { TAuthContext, TServerCall } from "../types/authContext";
import { api } from "services/axios";
import useCookie from "react-use-cookie";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<TAuthContext | null>(null);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useCookie("token", "");
  const [userInfo, setUserInfo] = useCookie(
    "userInfo",
    JSON.stringify({
      first_name: "",
      last_name: "",
      email: "",
      uid: "1",
      username: "",
    })
  );
  function storeToken(token: string) {
    // let tempDay = getExpireDate(token);
    let tempDay = 1;
    setToken(token, {
      days: tempDay,
    });
  }

  function logout() {
    setToken("");
    setUserInfo("{}");
  }

  const serverCall = async ({ entity, method, data }: TServerCall) => {
    try {
      let requestOptions = {
        url: entity,
        headers: {
          Authorization: "Bearer " + token,
        },
        method,
        ...(data && { data }),
      };

      let response = await api({ ...requestOptions });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected Error - ${response?.statusText}`);
      }
    } catch (e: any) {
      if (e?.response?.status === 401) {
        logout();
      }
      throw new Error(JSON.stringify(e) || `Unexpected Error`);
    }
  };

  const getRequest = async ({
    queryKey,
  }: {
    queryKey: string | number | boolean | Array<number | boolean | string>;
  }) => {
    let tempEntity = queryKey;
    if (Array.isArray(queryKey)) {
      tempEntity = queryKey.join("/");
    }
    tempEntity = String(tempEntity);
    try {
      return await serverCall({ entity: tempEntity, method: "get" });
    } catch (error: any) {
      throw new Error(error?.message || `Unexpected Error Happened`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        serverCall,
        getRequest,
        isUserLoggedIn: Boolean(JSON.parse(userInfo).uid),
        logout,
        userInfo: JSON.parse(userInfo),
        setUserInfo: (info) => setUserInfo(JSON.stringify(info)),
        storeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// type TDecodedToken = {
//   iat: number;
//   exp: number;
// };
// function getExpireDate(token: string) {
//   const DAY_IN_MILISECONDS = 86400000;
//   let decoded: TDecodedToken = jwtDecode(token);
//   let expire = decoded.exp * 1000; // convert to miliseconds
//   let now = new Date().getTime(); // get current time
//   let result = (expire - now) / DAY_IN_MILISECONDS; // get expire time base on milisecond in day
//   return result;
// }
