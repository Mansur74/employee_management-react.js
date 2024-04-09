import axios from 'axios';
import { DataResult, UserDetail } from './../db';
import { getAccessToken, getRefreshToken } from './AuthorizationService';
export const createMyUserDetail = async (userDetail: UserDetail) =>  {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.post<DataResult<UserDetail>>(`http://localhost:8080/api/my/userDetail`, userDetail, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const updateMyUserDetail = async (userDetailId: number, userDetail: UserDetail) =>  {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.put<DataResult<UserDetail>>(`http://localhost:8080/api/my/userDetail/${userDetailId}`, userDetail, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}