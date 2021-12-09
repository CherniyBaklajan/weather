import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import windIcon from "../assets/img/icons/wind.png";
import waterIcon from "../assets/img/icons/water.png";
import warnIcon from "../assets/img/icons/warn.png";
import {showIcon, showTemp} from "../components/functions";

class MainTemperature extends React.Component{
    render(){
        const {data} = this.props;
        return <Container className='main-temperature-box'>
            <Row>
                <Col xs={6} className='text-right'>
                    <img src={showIcon(data)} width={140} alt=''/>
                </Col>
                <Col xs={6} className='text-left'>
                    <h1>{data ? showTemp(data.main.temp) : '-'}</h1>
                </Col>
            </Row>
            <Row className='text-center'>
                <p>{data ? data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1) : '-'}</p>
            </Row>
            <Row className='text-center'>
                <Col md={{ span: 2, offset: 3 }} xs={4}>
                    <div className="info-box">
                        <img src={windIcon} alt="" width={36}/> <span>{data ? data.wind.speed : '-'} m/c</span>
                    </div>
                </Col>
                <Col md={2} xs={4}>
                    <div className="info-box">
                        <img src={waterIcon} alt="" width={36}/> <span>{data ? data.main.humidity : '-'}%</span>
                    </div>
                </Col>
                <Col md={2} xs={4}>
                    <div className="info-box">
                        <img src={warnIcon} alt="" width={36}/> <span>{data ? data.main.pressure : '-'} мм.рт.ст</span>
                    </div>
                </Col>
            </Row>
        </Container>
    }
}

export default MainTemperature;