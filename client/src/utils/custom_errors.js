import { ErrorMessages } from "../constants/customMessages";

export const throwServerError = (error) => {
  const serverError = error.response?.data;

  if (serverError)
    throw new Error(serverError.message ?? ErrorMessages.generalMessage);
  else throw new Error(error.message ?? ErrorMessages.generalMessage);
};
