import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';


    export class Region extends Component {
        render() {
            return(
                <div>
                <Card>
                    <CardBody>
                        <CardTitle><h2>Airlines</h2></CardTitle>
                        <CardText><p>The airlines tab displays basic statistical descriptions as well as some 
                            graphics to display information comparing each airline. You can select 
                            flights depending on origin and destination of the flight.</p>
                            </CardText>
                    </CardBody>
                </Card>
             </div>
            );
        }
    }