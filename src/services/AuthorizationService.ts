import { AccessToken, AuthRequest, RefreshToken } from './../db';
import axios from "axios"
import { DataResult, Result, AuthResponse, User } from "../db";

export const signUp = async (user: User) => {
  const result = await axios.post<Result>("http://localhost:8080/api/authorization/sign-up", user);
  return result;
}

export const signIn = async (authRequst: AuthRequest) => {
  const result = await axios.post<DataResult<AuthResponse>>("http://localhost:8080/api/authorization/sign-in", authRequst);
  return result;
}

export const getAccessToken = async (refreshToken: string) => {
  const body: RefreshToken = {refreshToken: refreshToken};
  const result = await axios.post<DataResult<{accessToken: string}>>("http://localhost:8080/api/authorization/accessToken", body);
  return result;
}


export const logout = async () => {
  const refreshToken = getRefreshToken();
  const result = await axios.delete<Result>("http://localhost:8080/api/authorization/logout", {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });
  return result;
}

export const getRefreshToken = () =>
{
  const local: string | null = localStorage.getItem("refreshToken");
  const session: string | null = sessionStorage.getItem("refreshToken")!;
  if(local)
    return local;
  else if(session)
    return session;
  return null;
}

