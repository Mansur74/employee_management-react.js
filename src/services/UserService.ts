import axios from "axios";
import { DataResult, Result, User } from "../db";

export const getMe = async (accessToken: string) => {
  const result = await axios.get<DataResult<User>>("http://localhost:8080/api/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
  return result;
}

export const updateMe = async (user: User, accessToken: string) =>  {
  const result = await axios.put<DataResult<User>>(`http://localhost:8080/api/user/me`, user, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const deleteMe = async (accessToken: string) =>  {
  const result = await axios.delete<Result>(`http://localhost:8080/api/user/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}