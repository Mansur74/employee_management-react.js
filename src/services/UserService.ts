import axios from "axios"
import { User } from "../db";

export const signUp = (user: any) => {
  try {
    const result = axios.post<string>("http://localhost:8080/api/user/sign-up", user);
    return result;
  } 
  catch (error) {
    console.log(error);
  }
}

export const signIn = (user: any) => {
  try {
    const result = axios.post<User>("http://localhost:8080/api/user/sign-in", user);  
    return result;
  } 
  catch (error) {
    console.log(error);
  }
}