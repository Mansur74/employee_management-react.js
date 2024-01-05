import axios from "axios"
import { DataResult, Result, Token, User } from "../db";

export const signUp = async (user: User) => {
  const result = await axios.post<DataResult<string>>("http://localhost:8080/api/authorization/sign-up", user);
  return result;
}

export const signIn = async (user: any) => {
  const result = await axios.post<DataResult<Token>>("http://localhost:8080/api/authorization/sign-in", user);
  result.data && localStorage.setItem("refreshToken", result.data.data.refreshToken);
  return result;
}

export const getAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const result = await axios.get<DataResult<{accessToken: string}>>("http://localhost:8080/api/authorization/accessToken", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    }
  });
  return result.data;
}

export const authorize = async () => {
  const accessToken = (await getAccessToken()).data.accessToken;
  const result = await axios.get<DataResult<User>>("http://localhost:8080/api/authorization/authorize", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
  return result;
}

export const logout = async () => {
  localStorage.removeItem("user");
  const accessToken = localStorage.getItem("refreshToken");
  const result = await axios.delete<Result>("http://localhost:8080/api/authorization/logout", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

