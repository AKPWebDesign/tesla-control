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
      return () => {};
    }

    const { request, cancel } = TeslaAPI.getVehicles();
    request.then(_ => setVehicles(_));

    return () => cancel();
  }, [userData]);

  if (vehicles === null) {
    return 'Loading...';
  }

  return (
    <div className={styles.vehicleListPage}>
      {vehicles.map(vehicle => (
        <VehicleDisplay vehicle={vehicle} key={vehicle.id} />
      ))}
    </div>
  );
};

export default VehicleListPage;
