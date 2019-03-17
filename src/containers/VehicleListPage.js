import React, { useState, useEffect } from 'react';
import TeslaAPI from '../adapters/TeslaAPI';
import VehicleDisplay from '../components/VehicleDisplay/VehicleDisplay';
import useTeslaAuth from '../hooks/useTeslaAuth';
import styles from './VehicleListPage.less';

const VehicleListPage = () => {
  const { userData } = useTeslaAuth();
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
    if (!userData) {
      return;
    }

    if (vehicles === null) {
      TeslaAPI.getVehicles()
        .then(_ => setVehicles(_));
    }
  });

  if (vehicles === null) {
    return 'Loading...';
  }

  return (
    <div className={styles.vehicleListPage}>
      {vehicles.map(vehicle => (
        <a href={`/vehicle/${vehicle.id}`} className={styles.vehicleLink}>
          <VehicleDisplay vehicle={vehicle} key={vehicle.id} />
        </a>
      ))}
    </div>
  );
};

export default VehicleListPage;
