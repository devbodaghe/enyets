import React, {useState} from 'react';
import './App.css';

const key:string = "AIzaSyDMbJoOSv1cbnHZ2mWOcjIUj4r4GyGF1Pg";

const App: React.FC = () => {

  const [latitude,setLatitude] = useState<number | undefined>(); 
  const [longitude,setLongitude] = useState<number | undefined>(); 
  const [data, setData] = useState<any []>();
  
  const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';  
  const url:string = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=hospital&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@"+latitude+","+longitude+"&key="+key 
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
            data.map( result => {
              return (
                <li key={result.formatted_address}>{result.formatted_address}</li>
              )
            })
          }
        </ul>
      </div>
    </div>

  )
}

export default App;
