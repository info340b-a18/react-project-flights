import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet'
const position = [51.0, -0.09]

export class Region extends Component {
  constructor(props) {
    super(props)
  }
render() {
    return (
      <div>
        <Map
          style={{height: "100vh"}}
          center={position}
          zoom={10}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
        </Map>
      </div>
    )
  }
}