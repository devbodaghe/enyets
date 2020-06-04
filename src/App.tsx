import React, {useState} from 'react';
import './App.css';

const key:string = "AIzaSyDMbJoOSv1cbnHZ2mWOcjIUj4r4GyGF1Pg";

const App: React.FC = () => {

  const [latitude,setLatitude] = useState<number | undefined>(); 
  const [longitude,setLongitude] = useState<number | undefined>(); 
  const [data, setData] = useState<any []>();
  
  const url = "https://cors.io/?https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=hospital&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@"+latitude+","+longitude+"&sensor=false&key="+key
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
    fetch(url)
      .then(response => response.text().then((s) => console.log(JSON.parse(s))))
      .then(data => console.log(data))
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
        Get url
      </button>
    </div>

  )
}

export default App;
