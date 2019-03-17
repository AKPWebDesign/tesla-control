import React from 'react';

export const viewOptions = {
  REAR: 'STUD_REAR',
  SEAT: 'STUD_SEAT',
  SIDE: 'STUD_SIDE',
  TQTR: 'STUD_3QTR',
  WHEEL: 'STUD_WHEEL',
};

const TeslaCompositor = ({ optionCodes, size = 1920, view = viewOptions.TQTR }) => {
  let model = null;

  if (optionCodes.includes('MDLS') || optionCodes.includes('MS03')) {
    model = 'ms';
  }

  if (optionCodes.includes('MDLX')) {
    model = 'mx';
  }

  if (optionCodes.includes('MDL3')) {
    model = 'm3';
  }

  if (optionCodes.includes('MDLY')) {
    model = '3a1d1c6cdccb462405eee5db90fcbd39';
  }

  return <img src={`https://static-assets.tesla.com/v1/compositor/?model=${model}&view=${view}&size=${size}&options=${optionCodes}&bkba_opt=1`} alt="Tesla Compositor" />
};

export default TeslaCompositor;
