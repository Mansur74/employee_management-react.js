import axios from 'axios';
import { DataResult, UserDetail } from './../db';
export const createMyUserDetail = async (userDetail: UserDetail, accessToken: string) =>  {
  const result = await axios.post<DataResult<UserDetail>>(`http://localhost:8080/api/my/userDetail`, userDetail, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const updateMyUserDetail = async (userDetailId: number, userDetail: UserDetail, accessToken: string) =>  {
  const result = await axios.put<DataResult<UserDetail>>(`http://localhost:8080/api/my/userDetail/${userDetailId}`, userDetail, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}