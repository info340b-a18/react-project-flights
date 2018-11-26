import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { flights } from "../data/flightData";
import { airports } from "../data/usAirports";


export class Region extends Component {
  constructor(props) {
    super(props)
  }
  renderMarkers = () => {
    return airports.map(
      (airports) => {
        const myCustomColour = '#583470'
        const size = airports.direct_flights
        const markerHtmlStyles = `background-color: ${myCustomColour};
                                  width: ${size}%;
                                  height: ${size}%;
                                  display: block;
                                  position: relative;
                                  border-radius: 1rem 1rem 0;
                                  transform: rotate(45deg);
                                  border: 1px solid #FFFFFF`
        const icon = L.divIcon({
          className: "my-custom-pin",
          iconAnchor: [0, 24],
          labelAnchor: [-6, 0],
          popupAnchor: [9, -25],
          html: `<span style="${markerHtmlStyles}" />`

        })
        return <Marker key={airports.code} position={[airports.lat, airports.lon]} icon={icon} >
          <Popup>
            <dl>
              <dt>Name: {airports.name}</dt>
              <dt>Code: {airports.code}</dt>
              <dt>City: {airports.city}</dt>
              <dt>State: {airports.state}</dt>
              <dt>Longitude: {airports.lon}</dt>
              <dt>Latitude: {airports.lat}</dt>
          </dl>
          </Popup>
        </Marker>
      }
    )
  }
  render() {
    return (
      <div>
        <Map
          style={{ height: "100vh" }}
          center={[35.64, -100.9141]}
          zoom={3}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          {this.renderMarkers()}
        </Map>
      </div>
    )
  }
}