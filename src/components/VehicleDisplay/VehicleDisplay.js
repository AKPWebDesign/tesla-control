import React from 'react';
import styles from './VehicleDisplay.less';
import TeslaCompositor from '../TeslaCompositor/TeslaCompositor';

const VehicleDisplay = ({ vehicle }) => (
  <div className={styles.vehicleDisplayContainer}>
    <TeslaCompositor optionCodes={vehicle.option_codes} size={800} />
    <div className={styles.info}>
      <div>{ vehicle.display_name }</div>
      <div>{ vehicle.vin }</div>
      <div>{ vehicle.state }</div>
    </div>
  </div>
);

export default VehicleDisplay;
