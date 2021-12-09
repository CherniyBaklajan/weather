import '../assets/scss/style.scss';
import React from "react";
import SelectCity from "../widgets/select_city";
import MainTemperature from "../widgets/main_temperature";
import FiveDaysWeather from "../widgets/five_days_weather";

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      currentWeather: false,
      fiveDaysWeather: false
    }
  }

  setWeatherData = (data) => {
    this.setState({currentWeather: data.data, fiveDaysWeather: data.fiveDays})
  }

  render(){
    const {currentWeather, fiveDaysWeather} = this.state;

    return <div className="App">
      <SelectCity onLoad={this.setWeatherData}/>
      <MainTemperature data={currentWeather}/>
      <FiveDaysWeather data={fiveDaysWeather}/>
    </div>
  }
}

export default App;
