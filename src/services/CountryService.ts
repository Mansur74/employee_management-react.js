import axios from "axios"
import { Country, DataResult } from "../db";
import { getAccessToken } from "./AuthorizationService";

export const getAllCountries = async (accessToken: string) => {
  const result = axios.get<DataResult<Country[]>>("http://localhost:8080/api/countries", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}