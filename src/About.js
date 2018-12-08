import React, { Component } from 'react';
import './Homepage.css'
import airport from './img/airport.jpeg';
import {
    Card, CardText, CardBody,
    CardTitle, CardImg
} from 'reactstrap';


// The about page....
export class About extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardImg top width="100%" className="card-img" src={airport} alt="" />
                    <div className="box">
                        <CardBody>
                            <CardTitle>About</CardTitle>
                            <CardText>Flight! is an interactive application to display the best airline to fly with
                            when flying domestically in the United States. You can create an account with your preferred Airline and see how it compares with other airlines.
                            It compares flight delays in United States. This website is made possible thanks to
                     <a href="https://www.kaggle.com/fabiendaniel/predicting-flight-delays-tutorial/notebook" target="_blank" rel="noopener noreferrer" className="link"> Kaggle's Dataset</a>.<br></br><br></br>
                                Air travel in 2017 was miserable. With the combination of "more flights,
                                    social media, rising fees, and diminishing personal space," led to regular
                    air-passenger outrage(<a href="https://tinyurl.com/y72bbdd2" target="_blank" rel="noopener noreferrer" className="link">Washington Post</a>).
                                Whether it is on the extreme side with flight attendants dragging passengers off the
                                plane or simple annoyances such as flight delays, there seem to be a wide range of
                    tedium with flying.<br></br><br></br>
                                Even though air travel is annoying, it is unavoidable for many of us. With this application,
                                    you can explore which airlines and airports passengers can fly with to make for
                                    a better experience. In perhaps reducing these annoyances, passengers could
                                    potentially make informed decisions for investing their money with the better
                                    airline to continue their loyalty to earn frequent flyer miles for rewards.<br></br><br></br>
                                This was made by James Kim, Jennifer Li, Won Barng, Leo Kwo
                        </CardText>
                        </CardBody>
                    </div>
                </Card>

            </div>
        );
    }
}