import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from "leaflet";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

L.Icon.Default.mergeOptions({
  iconRetinaUrl:require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl:require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

const Map = () => {

  const position: LatLngExpression = [38, -97];

  const { isLoading, error, data } = useQuery({queryKey: ["covidCasesByCountry"], queryFn:() =>
  axios.get(
    "https://disease.sh/v3/covid-19/countries"
  ).then((res) => res.data)
});

if (isLoading) return <div>Loading...</div>;

if (error) return <div>An error has occurred</div>;

  return (
    <div>
      <MapContainer center={position} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          data?.map((item:any, index:number) => 
            {
              return (
                <Marker
                key={index}
                position={[item.countryInfo.lat, item.countryInfo.long]}
                title={`${item.country}`}
                >
                  <Popup>
                    <h6 className='font-semibold text-center mb-2'>{item.country}</h6>
                    <div>Active cases: {item.active}</div>
                    <div>Recovered cases: {item.recovered}</div>
                    <div>Total deaths: {item.deaths}</div>
                  </Popup>
                </Marker>
                )
            }
          )
        }
      </MapContainer>
      <p className='mt-4 text-center'>Above Map shows covid cases info around different countries</p>
    </div>
  )
}

export default Map