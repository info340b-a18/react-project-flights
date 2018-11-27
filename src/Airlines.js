import React, { Component } from 'react';
import airport from './img/airport.jpeg';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardGroup } from 'reactstrap';
import chart1 from './img/basic-airlines.png'
import chart2 from './img/airlines-graph1.png'
import chart3 from './img/airlines-graph2.png'

    export class Airlines extends Component {
        render() {
            return(
            <div>
                <h1>Airlines</h1>
                <CardGroup>

                    <div className="box">
                       <h2>Basic Statistical Descriptions</h2>                       
                        <CardImg width="100%" src={chart1} alt="Card image cap" />
                        <p>This displays basic statistical descriptions of flight delays 
                grouped by airlines.</p>
                    </div>
                    <div className="box">
                    <CardTitle><h2>Pie Charts</h2></CardTitle>                  
                        <CardImg width="100%" src={chart2} alt="Card image cap" />
                        <p>This displays basic statistical descriptions of flight delays 
                grouped by airlines.</p>
                    </div>
                    <div className="box">
                        <h2>Delays by Airlines</h2>          
                        <CardImg width="100%" src={chart3} alt="Card image cap" />
                    <p>This displays basic statistical descriptions of flight delays 
                grouped by airlines.</p>
                    </div>
                </CardGroup>
             </div>
            );
        }
    }