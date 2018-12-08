import React, { Component } from 'react';
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import 'react-table/react-table.css'
import { flights } from "./data/flights";
import { airline } from "./data/airline";
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';

import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/app';
import Switch from "react-switch";

import './Airline.css'

export class Airlines extends Component {

  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
// obtains the user's preferred airline to use for highlighting the table
  handleChange(checked) {
    if(this.props.user == null && this.state.checked === false) {
      alert("You must signed in to highlight your airline");
    }else {
      this.setState({ checked });
    }
    if(this.props.user !== null && this.state.checked === false) {
      firebase.database().ref('users').child(this.props.user.uid).on('value', (snapshot) => this.setState({'airline' : snapshot.val().text}))
    }
  }

// creates the table using react-table package
  render() {
    const data = flights

    const columns = [{
      Header: 'Airline',
      accessor: 'AIRLINE',
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }

        return row[filter.id] === filter.value;
      },
      Filter: ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">Show All</option>
          <option value="UA - United Airlines">United Airlines</option>
          <option value="NK - Spirit Airlines">Spirit Airlines</option>
          <option value="AA - American Airlines">American Airlines</option>
          <option value="US - US Airways">US Airways</option>
          <option value="F9 - Frontier Airlines">Frontier Airlines</option>
          <option value="B6 - JetBlue Airways">JetBlue Airways</option>
          <option value="OO - Skywest Airlines">Skywest Airlines</option>
          <option value="AS - Alaska Airlines">Alaska Airlines</option>
          <option value="WN - Southwest Airlines">Southwest AirLines</option>
          <option value="DL - Delta Airlines">Delta Airlines</option>
          <option value="EV - Atlantic Southeast Airlines">Atlantic Southeast Airlines</option>
          <option value="HA - Hawaiian Airlines">Hawaiian Airlines</option>
          <option value="MQ - American Eagle Airlines">American Eagle Airlines</option>
          <option value="VX - Virgin America">Virgin America</option>
        </select>
    }, {
      Header: 'Origin Airport',
      accessor: 'ORIGIN_AIRPORT',
      Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["ORIGIN_AIRPORT"] }),
      filterAll: true

    },
    {
      Header: 'Destination Airport',
      accessor: 'DESTINATION_AIRPORT',
      Cell: props => <span className='number'>{props.value}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["DESTINATION_AIRPORT"] }),
      filterAll: true // Custom cell components!
    },
    {
      Header: 'Departure Delay (Minutes)',
      accessor: 'DEPARTURE_DELAY',
      Cell: props => <span className='number'>{props.value}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["DEPARTURE_DELAY"] }),
      filterAll: true // Custom cell components!
    }]
    const airlineData = airline;
    return (
      <div>
        <Card>
          <CardBody id="cardbody">
            <div className="box" id="graph" style={{
              paddingTop: '3.5rem'
            }}>
              <CardBody>
                <CardTitle>Airline Delay Time</CardTitle>
                <CardText>This graph demonstrates the maximum and minimum delay time of each airline.</CardText>
                <div style={{
                  paddingBottom: '56.25%',
                  position: 'relative',
                  height: 0
                }} >
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%'
                  }}>
                    <ResponsiveContainer id="chart" width="100%" height="100%" >
                      <BarChart width={600} height={300} data={airlineData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="AIRLINE" />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                        <ReferenceLine y={0} stroke='#000' />
                        <Brush dataKey='name' height={30} stroke="#8884d8" />
                        <Bar dataKey="max" fill="#8884d8" />
                        <Bar dataKey="min" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p id="desc">*This graph can only be displayed on large screens</p>
                  </div>
                </div>
              </CardBody>
            </div>
            <div className="box" id="table" style={{
              paddingTop: '3.5rem'
            }}>
              <CardBody>
                <CardTitle>Airline Information</CardTitle>

                <CardText>This table contains airline information including origin airport, destination airport and departure delay.
                  You can filter airlines and sort the data alphabetically by clicking on the column names. In addition, if you click highlight your  airline, your preferred
                  airline will be highlighted.
                 </CardText>
                <label htmlFor="normal-switch">
                  <span>Highlight Your Airline</span>
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                    id="normal-switch"
                  />
                </label>
                < ReactTable
<<<<<<< HEAD
                // highlights the table with preferred airline
=======
                
>>>>>>> master
                  getTrProps={(state,rowInfo)=> {
                    if(this.state.checked == true) {
                      return {
                          style: {
                            background: rowInfo.row.AIRLINE == this.state.airline ? "yellow" : "white"
                        }
                      }
                    } else {
                      return {
                        style: {
                          background: rowInfo.row.AIRLINE ==  "white"
                      }
                    }
                    } 
                  }
                  }
                  data={data}
                  minRows={10}
                  filterable
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                  columns={columns}
                />
              </CardBody>
            </div>
          </CardBody>
        </Card>
      </div>

    )
  }
}

