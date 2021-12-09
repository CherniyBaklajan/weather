import axios from "axios";

const instance = axios.create({
    baseURL: `http://api.openweathermap.org/data/2.5`,
});

instance.interceptors.request.use(
    config => ({
        ...config,
        params: {...config.params, appid: '2ee281baa0b2a4fdb00f9ff1bf13f5a7', units: 'metric', lang: 'ru'}
    })
)

export default instance;