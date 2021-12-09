import {Col, Container, Row} from "react-bootstrap";
import Select from "react-select";
import React from "react";
import cityOptions from "../components/city_options";
import {getWeather} from "../services/weather";
import moment from "moment";
import navigationIcon from "../assets/img/icons/navigation.png";

class SelectCity extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: false,
            fiveDays: false,
            geoAvailable: false,
            requesting: false
        }
    }

    componentDidMount() {
        const geo = "geolocation" in navigator;
        this.setState({geoAvailable: geo});
    }

    getCurrentLocation = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(position => {
            this.loadData({lat: position.coords.latitude, lon: position.coords.longitude})
        })
    }

    resetCity = (e) => {
        e.preventDefault();
        const state = {...this.state};
        state.data = false;

        this.setState(state);
    }

    onSelectHandler = (value) => {
        this.loadData({q: value.value});
    }

    loadData = (params) => {
        const state = {...this.state};
        const {onLoad} = this.props;

        this.setState({requesting: true}, () => {
            getWeather(params).then((data) => {
                state.data = data.current.data;
                state.fiveDays = data.fiveDays.data;
            }).catch(err => console.log(err))
                .then(() => {
                    state.requesting = false;
                    onLoad(state);
                    this.setState(state);
                })
        })
    }


    render(){
        const {requesting, data, geoAvailable} = this.state;

        return <Container className='select-city-box'>
            <Row>
                <Col md={3} xs={6}>
                    {data ? <h2>{data.name}</h2> :
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={true}
                            name="city"
                            options={cityOptions}
                            placeholder="Выберите город"
                            onChange={this.onSelectHandler}
                            isLoading={requesting}
                        />
                    }
                </Col>
                <Col md={4} xs={6}>
                    <div className="time">
                        <p>{data ? `Сейчас ${moment(data.dt * 1000).format('HH:mm')}` : ''}</p>
                    </div>
                </Col>
            </Row>
            <div className="city-actions">
                <Row>
                    <Col md={2} xs={6}>
                        <a href="#" onClick={this.resetCity}>Сменить город</a>
                    </Col>
                    <Col md={4} xs={6}>
                        {geoAvailable ?
                            <a href="#" onClick={this.getCurrentLocation}>
                                <img src={navigationIcon} width={15} alt='Navigation'/>
                                Мое местоположение
                            </a> : ''}
                    </Col>
                </Row>
            </div>
        </Container>
    }
}

export default SelectCity;