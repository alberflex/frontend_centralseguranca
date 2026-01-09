import axios from "axios";
export const conexaoAPI = axios.create({ baseURL: process.env.REACT_APP_URL_API, headers: { "Content-Type": "application/json", Accept: "application/json" } });