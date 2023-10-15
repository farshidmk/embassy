import React from "react";
import { TAuthContext, TServerCall } from "../types/authContext";
import useCookie from "react-use-cookie";
import { api } from "services/axios";
import useLocalStorage from "hooks/useLocalStorge";
import { ILoggedInUser } from "types/user";
import { convertArabicCharToPersian } from "services/convertArabicCharToPersian";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<TAuthContext | null>(null);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useCookie("token", "");
  const [userInfo, setUserInfo] = useLocalStorage<ILoggedInUser>("userInfo", { full_name: "", user_id: 0 });

  function storeToken(token: string) {
    // let tempDay = getExpireDate(token);
    let tempDay = 1;
    setToken(token, {
      days: tempDay,
    });
  }

  const serverCall = async ({ entity, method, data = { test: 1 } }: TServerCall) => {
    try {
      let requestOptions = {
        url: convertArabicCharToPersian(entity),
        method,
        headers: {
          Authorization: "Bearer " + token,
        },
        redirect: "follow",
        ...(data && { data: convertArabicCharToPersian(JSON.stringify(data)) }),
      };

      let response = await api({ ...requestOptions });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected Error - ${response?.statusText}`);
      }
    } catch (e) {
      throw new Error(JSON.stringify(e) || `Unexpected Error`);
    }
  };

  async function logout() {
    setToken("");
  }

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
        token,
        storeToken,
        serverCall,
        getRequest,
        isUserLoggedIn: !!token,
        logout,
        userInfo,
        setUserInfo,
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
