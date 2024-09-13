import { postRequest } from "../api";
import { throwServerError } from "./../utils/custom_errors";

const MODEL_NAME = "/auth";

export async function SignIn(payload) {
  try {
    const result = await postRequest(`${MODEL_NAME}/login`, payload);
    console.log("Inm the service login", result);

    return result;
  } catch (err) {
    return throwServerError(err);
  }
}

export async function SignUp(payload) {
  try {
    const result = await postRequest(`${MODEL_NAME}/signup`, payload);
    return result;
  } catch (err) {
    return throwServerError(err);
  }
}
