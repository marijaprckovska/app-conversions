import './App.css';
import Conversion from './Conversion'
import MeasureConversions from './MeasureConversions'
import MeasureCultures from "./MeasureCultures";
import MeasureTypes from './MeasureTypes';
import MeasureDefaultTypes from './MeasureDefaultTypes';
import MeasureDatetimeZones from './MeasureDatetimeZones';
import MeasureUnits from './MeasureUnits';


import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';
import React, { element }  from 'react';


function App() {
  return (
    
    
    <div className="App container">
      
      <h3 className="d-flex justify-content-center m-3">
        Measure conversions with Reject JS 
      </h3>
        
      <BrowserRouter>

      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">

        <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Conversion">
              Conversion
            </NavLink>
          </li>
          
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/measureConversions">
              MeasureConversions
            </NavLink>
          </li>

          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/measureCultures">
              MeasureCultures
            </NavLink>
          </li>

          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/measureDefaultTypes">
              MeasureDefaultTypes
            </NavLink>
          </li>

          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/measureTypes">
              MeasureTypes
            </NavLink>
          </li>

          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/measureDatetimeZones">
            Measure Datetime Zones
            </NavLink>
          </li>

          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/measureUnits">
            Measure Units
            </NavLink>
          </li>

          

        </ul>

      </nav>

      <Routes>
        <Route path='/conversion' element={<Conversion/>} />
        <Route path='/measureConversions' element={<MeasureConversions/>} />
        <Route path='/measureCultures' element={<MeasureCultures/>} />
        <Route path='/measureTypes' element ={<MeasureTypes/>} />
        <Route path='/measureDefaultTypes' element ={<MeasureDefaultTypes/>} />
        <Route path='/measureDatetimeZones' element ={<MeasureDatetimeZones/>} />
        <Route path='/measureUnits' element ={<MeasureUnits/>} />

        
      </Routes>

       </BrowserRouter>

       </div>
    
  );
}

export default App;