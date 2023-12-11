import axios from "axios";
import { Passport } from "../db";

export const getPassportById = async (id: string) => {
  try {
    const data = await axios.get<Passport>(`http://localhost:3005/api/passport/${id}`);
    return data;
  } 
  catch (error: any) {
    console.log(error)
  }
 
 }

 export const createPassport = async (employeeId: string, body: any) => {
  try {
    const data = await axios.post(`http://localhost:3005/api/passport/${employeeId}`, body);
    return data;
  } 
  catch (error: any) {
    console.log(error)
  }
 }

 export const updatePassportById = async (passportId: string, body: any) => {
  try {
    const data = await axios.patch(`http://localhost:3005/api/passport/${passportId}`, body);
    return data;
  } 
  catch (error: any) {
    console.log(error)
  }
 
 }