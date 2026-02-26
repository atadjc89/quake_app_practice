import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'; //import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Fragment } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import MyMapComponent from './components/MapComponent'
import ListGroup from './components/ListGroup';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [againpassword, setAgainpassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // const [coordinates, setCoordinates] = useState([])
  // const [zipcode, setZipcode] = useState("")

  return (
  <>
  <div style={{ backgroundColor: '#054e2ce6', minHeight: '100vh', minWidth: '200px', padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ListGroup 
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      againpassword={againpassword}
      setAgainpassword={setAgainpassword}
      latitude={latitude}
      setLatitude={setLatitude}
      longitude={longitude}
      setLongitude={setLongitude}
      
      />}/>
      <Route path="/main"element={<MyMapComponent
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      againpassword={againpassword}
      setAgainpassword={setAgainpassword}
      latitude={latitude}
      setLatitude={setLatitude}
      longitude={longitude}
      setLongitude={setLongitude}
      
      />}/>
    </Routes>
  </BrowserRouter>
  </div>
  </>
  )
}


export default App;