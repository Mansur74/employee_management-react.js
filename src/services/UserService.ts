import axios from "axios";
import { DataResult, User } from "../db";

export const updateMe = async (user: User, accessToken: string) =>  {
  const result = await axios.put<DataResult<User>>(`http://localhost:8080/api/user/me`, user, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}