import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'; //import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Fragment } from 'react';

import MyMapComponent from './components/MapComponent'
import ListGroup from './components/ListGroup';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
  <>
  <div style={{ backgroundColor: '#054e2ce6', minHeight: '100vh', minWidth: '200px', padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ListGroup/>}/>
      <Route path="/main"element={<MyMapComponent/>}/>
    </Routes>
  </BrowserRouter>
  </div>
  </>
  )
}


export default App;