import React from 'react';

import './styles.css';

function PlanCard({ planName, price, acquirable }) {
  return (
    <div className='card'>
      <p>{planName}</p>
      <strong>R$ {price}</strong>
      {acquirable && <button>Adquirir</button>}
    </div>
  );
}

export default PlanCard;
