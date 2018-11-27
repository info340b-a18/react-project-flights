import React, { Component } from 'react';
import './Homepage.css'
import airport from './img/airport.jpeg';
import {
    Card, CardText, CardBody,
    CardTitle, CardImg, CardImgOverlay, Button
} from 'reactstrap';




export class Homepage extends Component {

    render() {
        return (
            <div>
                <Card>
                    <CardImg top width="100%" className="card-img" src={airport} alt="" />
                    <CardImgOverlay><h1 id="dashboard">Flight! Dashboard</h1></CardImgOverlay>
                    <CardBody>
                        <div className="box">
                            <CardBody>
                                <CardTitle><h2>Airlines</h2></CardTitle>
                                <CardText><p>The airlines tab displays basic statistical descriptions as well as some
                                graphics to display information comparing each airline. You can select
                        flights depending on origin and destination of the flight.</p>
                                </CardText>
                                <Button color="#003459" className="button" href="/Airlines">Airlines</Button>{' '}
                            </CardBody>
                        </div>
                        <div className="box">
                            <CardBody>
                                <CardTitle><h2>Region</h2></CardTitle>
                                <CardText><p>The region tab display the relation between origin airport and delays.
                        It also displays each airline's routes.</p>
                                </CardText>
                                <Button color="#003459" className="button" href="#">Region</Button>{' '}
                            </CardBody>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}