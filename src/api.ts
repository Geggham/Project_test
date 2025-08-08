import axios from "axios";

export const api = axios.create({
  baseURL: "http://109.73.206.144:6969/api",
  params: {
    key: "E6kUTYrYwZq2tN4QEtyzsbEBk3ie",
    dateFrom: "2023-01-01",
    dateTo: "2023-12-31",
    page: 1,
    limit: 100,
  },
});
