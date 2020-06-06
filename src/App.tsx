import React, {useState} from 'react';
import './App.css';

const key:string = "AIzaSyDMbJoOSv1cbnHZ2mWOcjIUj4r4GyGF1Pg";

const App: React.FC = () => {

  const [latitude,setLatitude] = useState<number | undefined>(); 
  const [longitude,setLongitude] = useState<number | undefined>(); 
  const [data, setData] = useState<any []>();
  const [distance, setDistance] = useState<1000 | undefined>()
  const [address,setAddress] = useState<string | undefined>();
  const [radius, setRadius] = useState("500");

  const [items] = useState([
    {
      label: "5 km",
      value: 500,
    },
    { label: "10 km", value: 10000 },
    { label: "15 km", value: 15000 },
    { label: "20 km", value: 20000 }, 
  ]);
  
  const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';  
  // const url:string = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=hospital&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@"+latitude+","+longitude+"&key="+key 
  const url:string = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&type=hospital&radius=500&key=${key}`; // site that doesn’t send Access-Control-*

  const URL = PROXY_URL + url
  
  const getLocation = ():void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        let lat = position.coords.latitude
        setLatitude(lat)
        let long = position.coords.longitude
        setLongitude(long)
        console.log(latitude)
        console.log(longitude)
      });
    }
    else {
      alert("Enable location")
    }
  }
  const getAddress = ():void => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${key}`)
    .then(response => response.json())
    // .then(console.log(data =>data.results[0].formatted_address))
    .then(data => setAddress(data.results[0].formatted_address))
    .catch(error => alert(error))
  }
  // issues with fetch and maps API 
  const gethospitals = ():void => {
    console.log(url)
    fetch(URL)
      .then(res => res.json())
      // .then(data => console.log(data.results))
      .then(data => setData(data.results))
  }
  return (
    <div>
      <select
          value={radius}
          onChange={(e) => {
            setRadius(e.target.value);
          }}
          onBlur={(e) => setRadius(e.target.value)}
        >
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      <button onClick = {getAddress}> Get Address</button>
      <button 
        className="location"
        onClick={getLocation}
      >
        Get location
      </button>
      <button 
        className="location"
        onClick={gethospitals}
      >
        Get Hospitals
      </button>
      <div>
        <ul>
          {
            data && 
            data.map( results => {
              return (
                <li key={results.name}>{results.name}</li>
              )
            })
          }
        </ul>
      </div>
    </div>

  )
}

export default App;
