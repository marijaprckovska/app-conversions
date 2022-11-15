import React from 'react';
import { useEffect, useState } from "react";

const MeasureDatetimeZones =() => {
  
    const [data, setData] = useState([]);
    const fetchData = () => {
      fetch('http://localhost:39885/api/measuredatatimezones')
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setData(actualData);
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    
      return(
        
  <div>
    <table border="2">
    <thead>
      <tr>
        <th>mdc_nAutoinc</th>
        <th>mdc_sZone</th>
        <th>mdc_sRegion</th>
        <th>mdc_sDefaultDateFormat</th>
        <th>mdc_sUtcTimezone</th>
        <th>mdc_sUtcTimezoneDST</th>

      </tr>
      </thead>
    <tbody>
    {data.map((item, index) => (
      <tr>
        <td>{item.mdc_nAutoinc}</td>
        <td>{item.mdc_sZone}</td>
        <td>{item.mdc_sRegion}</td>
        <td>{item.mdc_sUtcTimezone}</td>
        <td>{item.mdc_sUtcTimezoneDST}</td>
      </tr>
    ))};
    </tbody>
  </table>
  
  
  
 </div>
)};	
    export default MeasureDatetimeZones;