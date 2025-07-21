import axios from "axios";

const api = axios.create({ baseURL: "https://test.alecplus.tech/presale/api" });

export default api