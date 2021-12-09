import request from '../components/request';

export async function getWeather(params = {}) {
    const current = await request.get('/weather', {params});
    const fiveDays = await request.get('/forecast', {params});

    return {current, fiveDays}
}