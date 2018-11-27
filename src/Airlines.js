import React, { Component } from 'react';
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import 'react-table/react-table.css'
import { flights } from "./data/flights";

export class Airlines extends Component {
  constructor(props) {
    super(props)
  }
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
                      <option value="UA">United Airlines</option>
                      <option value="AA">American Airlines</option>
                      <option value="US">US Airways</option>
                      <option value="F9">Frontier Airlines</option>
                      <option value="B6">JetBlue Airways</option>
                      <option value="OO">Skywest Airlines</option>
                      <option value="AS">Alaska Airlines</option>
                      <option value="WN">Spirit Air Lines</option>
                      <option value="DL">Southwest Airlines</option>
                      <option value="EV">Atlantic Southeast Airlines</option>
                      <option value="HA">Hawaiian Airlines</option>
                      <option value="MQ">American Eagle Airlines</option>
                      <option value="VX">Virgin America</option>
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
    return (
      < ReactTable
        data={data}
        filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
        columns={columns}
      />)
  }
}

