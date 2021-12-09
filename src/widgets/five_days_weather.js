import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import arrowLIcon from "../assets/img/icons/arrow_l.png";
import arrowRIcon from "../assets/img/icons/arrow_r.png";
import {showIcon, showTemp, showWeekDay} from "../components/functions";
import moment from "moment";

class FiveDaysWeather extends React.Component{
    slideTo = (e, arrow) => {
        e.preventDefault();
        const weatherBoxs = document.querySelectorAll('.weather-box')
        const isLeft = arrow === 'left';
        weatherBoxs.forEach(element => {
            let step = isLeft ? 0 : 100;
            let value = parseInt(element.style.right);
            if(element.style.right && value > 0){
                step = isLeft ? value - 100 : value + 100;
            }

            element.style.right = step + 'px';
        });
    }

    render(){
        const {data} = this.props;
        let day;

        return data ? <div className='fivedays-box'>
            <Container>
                <Row>
                    <Col md={1} xs={2} className='text-center'>
                        <a href="" onClick={(e) => this.slideTo(e,'left')}>
                            <div className="arrow-box">
                                <img src={arrowLIcon} alt="" width={15}/>
                            </div>
                        </a>
                    </Col>
                    <Col md={10} xs={8}>
                        <div className="slider-box">
                            <div className="slider-content" style={{width: (data.list.length * 100) + 'px'}}>
                                {data.list.map(item => {
                                    let date = moment(item.dt * 1000);
                                    let isSplit = day !== undefined && day !== date.format('DD');
                                    day = date.format('DD');
                                    return <div className={`weather-box ${isSplit ? 'br-left' : ''}`} style={{right: '0px'}}>
                                        <p>{showWeekDay(date.isoWeekday())} {date.format('HH:mm')}</p>
                                        <img src={showIcon(item)} alt="" width={40}/>
                                        <p>{showTemp(item.main.temp)}</p>
                                    </div>
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col md={1} xs={2} className='text-center'>
                        <a href="" onClick={(e) => this.slideTo(e,'right')}>
                            <div className="arrow-box">
                                <img src={arrowRIcon} alt="" width={15}/>
                            </div>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div> : ''
    }
}

export default FiveDaysWeather;