import moment from "moment";
import sunIcon from "../assets/img/icons/sun.png";
import nightIcon from "../assets/img/icons/moon.png";
import mistIcon from "../assets/img/icons/mist.png";
import sunCloudsIcon from "../assets/img/icons/sun_clouds.png";
import snowIcon from "../assets/img/icons/snow.png";
import cloudsIcon from "../assets/img/icons/clouds.png";
import rainIcon from "../assets/img/icons/rain.png";


export function showTemp(temp) {
    const isNegative = temp < 0;
    const prefix = isNegative ? '' : '+';

    return `${prefix + Math.round(temp)}º`
}

export function showIcon(data){
    if(!data) return cloudsIcon;

    const hour = moment(data.dt * 1000).format('HH');
    const isDay = (hour >= 6 && hour < 18);
    let icon;

    switch(data.weather[0].main){
        case 'Clear':
            icon = isDay ? sunIcon : nightIcon;
            break;
        case 'Mist':
            icon = mistIcon;
            break;
        case 'Clouds':
            icon = isDay ? sunCloudsIcon : cloudsIcon;
            break;
        case 'Snow':
            icon = snowIcon;
            break;
        case 'Rain':
            icon = rainIcon;
            break;
        default:
            icon = cloudsIcon;
    }

    return icon;
}

export function showWeekDay(day){
    let result = '';
    switch(day){
        case 1:
            result = 'Пн.';
            break;
        case 2:
            result = 'Вт.';
            break;
        case 3:
            result = 'Ср.';
            break;
        case 4:
            result = 'Чт.';
            break;
        case 5:
            result = 'Пт.';
            break;
        case 6:
            result = 'Сб.';
            break;
        case 7:
            result = 'Вс.';
            break;
    }

    return result;
}