import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TeslaAPI from '../adapters/TeslaAPI';
import useTeslaAuth from '../hooks/useTeslaAuth';
import optionCodes from '../static-data/optionCodes.json';
import styles from './VehicleInfoPage.css';

const VehicleInfoPage = ({ match }) => {
  const { userData } = useTeslaAuth();
  const [vehicle, setVehicle] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    if (!userData || !match.params.vehicleId) {
      return () => {};
    }

    const { request, cancel } = TeslaAPI.getVehicle(match.params.vehicleId);
    request.then(_ => setVehicle(_));

    return () => cancel();
  }, [match.params.vehicleId, userData]);

  useEffect(() => {
    if (!userData || !match.params.vehicleId) {
      return () => {};
    }

    if (!vehicle || vehicle.state === 'asleep') {
      return () => {};
    }

    const { request, cancel } = TeslaAPI.getVehicleData(match.params.vehicleId);
    request.then(_ => setVehicleData(_));

    return () => cancel();
  }, [match.params.vehicleId, userData, vehicle]);

  if (vehicle === null) {
    return 'Loading...';
  }

  return (
    <div className={styles.vehicleInfoPage}>
      { vehicle.state === 'asleep' && (
        <button type="button" onClick={() => TeslaAPI.wakeUp(vehicle.id)}>Wake Up</button>
      )}
      <pre>{JSON.stringify(vehicle, null, 2)}</pre>
      <br />
      <br />
      <pre>{JSON.stringify(vehicleData, null, 2)}</pre>
      <br />
      <br />
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
          {vehicle.option_codes.split(',').map((code) => {
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

VehicleInfoPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      vehicleId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default VehicleInfoPage;
