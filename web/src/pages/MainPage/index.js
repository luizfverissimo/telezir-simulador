import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import PlanCard from '../../components/PlanCard';

import './styles.css';

function MainPage() {
  const [fromLocations, setFromLocations] = useState([]);
  const [toLocations, setToLocations] = useState([]);

  const loadFromLocation = async () => {
    const { data } = await api.get('/taxes');
    setFromLocations(data);
  };
  useEffect(() => {
    loadFromLocation();
  }, []);

  const fromLocationSelectorHandler = async (value) => {
    const { data } = await api.get(`/taxes/${value}`);
    setToLocations(data);
  };

  return (
    <div id='main-page'>
      <header className='page-header'>
        <div id='header-content' className='container'>
          <p>Telezir</p>
          <h1>Simulador de tarifas</h1>
        </div>
      </header>
      <main>
        <div id='main-page-content' className='container'>
          <div className='information'>
            <p>
              Selecione o DDD de onde está ligando e o DDD para onde você irá
              ligar e descubra quanto você pode economizar.
            </p>
          </div>
          <form className='form'>
            <fieldset>
              <legend>1. DDD de Origem</legend>
              <select
                defaultValue='1'
                onChange={(e) => fromLocationSelectorHandler(e.target.value)}
              >
                <option disabled value='1' hidden>
                  Selecione um DDD
                </option>
                {fromLocations.map((location) => {
                  return (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  );
                })}
              </select>
              <legend>2. DDD do Destino</legend>
              <select defaultValue='1'>
                <option disabled value='1' hidden>
                  Selecione um DDD
                </option>
                {toLocations.map((location) => {
                  return (
                    <option key={location.id} value={location.to}>
                      {location.to}
                    </option>
                  );
                })}
              </select>
              <legend>3. Tempo da ligação</legend>
              <input
                type='time'
                placeholder='Digite o tempo de ligação em minutos'
              />
            </fieldset>
            <div className='button-container'>
              <button onClick={() => console.log(fromLocations)}>
                Simular
              </button>
            </div>
          </form>
        </div>
      </main>
      <div className='card-container'>
        <div className='grid-container'>
          <PlanCard planName='FaleMais 30' price='39.90' acquirable={true} />
          <PlanCard planName='FaleMais 60' price='59.90' acquirable={true} />
          <PlanCard planName='FaleMais 120' price='89.90' acquirable={true} />
          <PlanCard planName='Sem plano' price='129.90' acquirable={false} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
