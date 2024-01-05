import axios from "axios"
import { Country, DataResult } from "../db";
import { getAccessToken } from "./AuthorizationService";

export const getAllCountries = async () => {
  const accessToken = (await getAccessToken()).data.accessToken;
  const result = axios.get<DataResult<Country[]>>("http://localhost:8080/api/country", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}