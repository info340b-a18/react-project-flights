import React, { Component } from 'react';
import './Homepage.css'
import airport from './img/airport.jpeg';
import airline from './img/airline.jpg';
import region from './img/region.jpg';
import {
    Card, CardText, CardBody,
    CardTitle, CardImg, CardImgOverlay, Button
} from 'reactstrap';
import { Link } from 'react-router-dom'




export class Homepage extends Component {

    render() {
        return (
            <div>
                <Card>
                    <CardImg top width="100%" className="card-img" src={airport} alt="" />
                    <CardBody>
                        <div className="box box1">
                            <CardBody>
                                <CardTitle><h2>Airlines</h2></CardTitle>
                                <CardText><p>The airlines tab displays basic statistical descriptions as well as some
                                graphics to display information comparing each airline. You can select
                        flights depending on origin and destination of the flight.</p>
                                </CardText>
                                <Button color="#003459" className="button" tag={Link} to="/Airlines">Airlines</Button>{' '}
                            </CardBody>
                        </div>
                        <div className="box box2">
                            <CardBody>
                                <CardTitle><h2>Region</h2></CardTitle>
                                <CardText><p>The region tab display the relation between origin airport and delays.
                        It also displays each airline's routes.</p>
                                </CardText>
                                <Button color="#003459" className="button" tag={Link} to="/Region">Region</Button>{' '}
                            </CardBody>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}