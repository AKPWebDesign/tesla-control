import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './VehicleDisplay.less';
import TeslaCompositor from '../TeslaCompositor/TeslaCompositor';

const VehicleDisplay = ({ vehicle }) => (
  <div className={styles.vehicleDisplayContainer}>
    <Link to={`/vehicle/${vehicle.id}`} className={styles.vehicleLink}>
      <TeslaCompositor optionCodes={vehicle.option_codes} size={800} />
      <div className={styles.info}>
        <div>{ vehicle.display_name }</div>
        <div>{ vehicle.vin }</div>
        <div>{ vehicle.state }</div>
      </div>
    </Link>
  </div>
);

VehicleDisplay.propTypes = {
  vehicle: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
    option_codes: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    vin: PropTypes.string.isRequired,
  }).isRequired,
};

export default VehicleDisplay;
