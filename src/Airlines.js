import React, { Component } from 'react';
import airport from './img/airport.jpeg';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardGroup } from 'reactstrap';
import chart1 from './img/basic-airlines.png'
import chart2 from './img/airlines-graph1.png'
import chart3 from './img/airlines-graph2.png'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

    /*export class Airlines extends Component {
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
    }*/
    const data = [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
  ];
    export class Airlines extends Component {
        render() {
            
        return(
        <LineChart
  width={400}
  height={400}
  data={data}
  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
>
  <XAxis dataKey="name" />
  <Tooltip />
  <CartesianGrid stroke="#f5f5f5" />
  <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
  <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
</LineChart>
        )
        }
    }