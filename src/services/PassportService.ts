import axios from "axios";
import { DataResult, Passport, Result } from "../db";
import { getAccessToken, getRefreshToken } from "./AuthorizationService";

export const getPassportById = async (id: number) => {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.get<DataResult<Passport>>(`http://localhost:8080/api/passport/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const createPassport = async (employeeId: number, passport: Passport) => {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.post<DataResult<Passport>>(`http://localhost:8080/api/employee/${employeeId}`, passport, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const updatePassportById = async (passportId: number, passport: Passport) => {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.put<DataResult<Passport>>(`http://localhost:8080/api/passport/${passportId}`, passport, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const deletePassport = async (passportId: number) => {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.delete<Result>(`http://localhost:8080/api/passport/${passportId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}