import axios from "axios";

const cryptoAxiosInstance = axios.create({
  baseURL: "https://min-api.cryptocompare.com/data",
});

export default cryptoAxiosInstance;
