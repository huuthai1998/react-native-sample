import axios from "axios";
// Next we make an 'instance' of it
const cryptoAxiosInstance = axios.create({
  // .. where we make our configurations
  baseURL: "https://min-api.cryptocompare.com/data",
});

export default cryptoAxiosInstance;
