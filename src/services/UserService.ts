import axios from "axios";
import { DataResult, Result, User } from "../db";
import { getAccessToken, getRefreshToken } from "./AuthorizationService";

export const getMe = async () => {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.get<DataResult<User>>("http://localhost:8080/api/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
  return result;
}

export const updateMe = async (user: User) =>  {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.put<DataResult<User>>(`http://localhost:8080/api/user/me`, user, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const deleteMe = async () =>  {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.delete<Result>(`http://localhost:8080/api/user/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}