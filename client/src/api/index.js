import axios from "axios";
import { environmentUrls } from "../constants";
import { HttpStatusCode } from "axios";

import { ErrorMessages } from "../constants/CustomMessages";

const defaultTimeout = 10000;

const formDataRequestHeaders = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const jsonRequestHeaders = {
  headers: {
    "Content-Type": "application/json",
  },
};

axios.defaults.baseURL = environmentUrls.api_url;
axios.defaults.timeout = defaultTimeout;

// Request interceptor to add Bearer token
axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    // const token = userStore.getState().token;
    const idToken = token;
    if (idToken) config.headers.Authorization = `Bearer ${idToken}`;

    config.timeoutErrorMessage = ErrorMessages.timeoutMessage;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.status === HttpStatusCode.Ok) {
      return response?.data?.data;
    } else {
      throw new Error(ErrorMessages.generalMessage);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getRequest = (
  url,
  params = {},
  config = {
    ...jsonRequestHeaders,
  }
) => axios.get(url, { params, ...config });

export const postRequest = (
  url,
  data,
  config = {
    ...jsonRequestHeaders,
  }
) => axios.post(url, data, config);

export const putRequest = (
  url,
  data,
  config = {
    ...jsonRequestHeaders,
  }
) => axios.put(url, data, config);

export const deleteRequest = (
  url,
  config = {
    ...jsonRequestHeaders,
  }
) => axios.delete(url, config);

export const getFormDataRequest = (
  url,
  params = {},
  config = {
    ...formDataRequestHeaders,
  }
) => axios.get(url, { params, ...config });

export const postFormDataRequest = (
  url,
  data,
  config = {
    ...formDataRequestHeaders,
  }
) => axios.post(url, data, config);

export const putFormDataRequest = (
  url,
  data,
  config = {
    ...formDataRequestHeaders,
  }
) => axios.put(url, data, config);

export const deleteFormDataRequest = (
  url,
  config = {
    ...formDataRequestHeaders,
  }
) => axios.delete(url, config);
