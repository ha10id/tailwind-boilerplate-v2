import axios from "axios";
import { baseUrl } from "../config";

const API = axios.create({
  baseURL: baseUrl,
  responseType: "json"
});

API.interceptors.request.use(request => {
  request.headers["Authorization"] = "Bearer " + window.localStorage.token;
  //console.log(request);
  return request;
});

export { API };