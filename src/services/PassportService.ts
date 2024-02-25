import axios from "axios";
import { DataResult, Passport } from "../db";
import { getAccessToken } from "./AuthorizationService";

export const getPassportById = async (id: string, accessToken: string) => {
  const result = await axios.get<DataResult<Passport>>(`http://localhost:8080/api/passport/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const createPassport = async (employeeId: string, passport: Passport, accessToken: string) => {
  const result = await axios.post<DataResult<Passport>>(`http://localhost:8080/api/employee/${employeeId}`, passport, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const updatePassportById = async (passportId: string, passport: Passport, accessToken: string) => {
  const result = await axios.put<DataResult<Passport>>(`http://localhost:8080/api/passport/${passportId}`, passport, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}