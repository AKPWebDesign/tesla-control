import React, { useState, useEffect } from 'react';
import TeslaAPI from '../adapters/TeslaAPI';
import useTeslaAuth from '../hooks/useTeslaAuth';
import optionCodes from '../static-data/optionCodes.json';
import './VehicleInfoPage.css';

const VehicleInfoPage = () => {
  const { userData } = useTeslaAuth();
  const [vehicles, setVehicles] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    if (!userData) {
      return;
    }

    if (vehicles === null) {
      TeslaAPI.getVehicles()
        .then(_ => setVehicles(_));
    }

    if (vehicles !== null && vehicleData === null) {
      if (vehicles[0].state === 'asleep') {
        return setVehicleData('💤💤💤 car is tired now 💤💤💤');
      }
      TeslaAPI.getVehicleData(vehicles[0].id)
        .then(_ => setVehicleData(_));
    }
  });

  if (vehicles === null) {
    return "Loading...";
  }

  return (
    <div className="vehicle-info-page">
      <button onClick={() => TeslaAPI.logout()}>Log Out</button>
      { vehicles[0].state === 'asleep' && (
        <button onClick={() => TeslaAPI.wakeUp(vehicles[0].id)}>Wake Up</button>
      )}
      <pre>{JSON.stringify(vehicles, null, 2)}</pre>
      <br /><br />
      <pre>{JSON.stringify(vehicleData, null, 2)}</pre>
      <br /><br />
      <h2>Option Codes</h2>
      <table className="ui small striped compact padded celled table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Meaning</th>
            <th>Long Description</th>
          </tr>
        </thead>
        <tbody>
          {vehicles[0]['option_codes'].split(',').map(code => {
            const optionCode = optionCodes[code] || {};
            return (
              <tr key={code} className={`${optionCode.code ? '' : 'warning'}`}>
                <td>{code}</td>
                <td>{optionCode.meaning || 'No Information'}</td>
                <td>{optionCode.description || ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleInfoPage;
