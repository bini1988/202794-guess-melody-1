import axios from "axios";

const baseURL = `https://es31-server.appspot.com/guess-melody`;
const timeout = 5000;
const instance = axios.create({baseURL, timeout, withCredentials: true});

export default instance;
