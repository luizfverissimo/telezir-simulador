import React from 'react';

import './styles.css';
import PlanCard from '../../components/PlanCard';

function MainPage() {
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
              <select defaultValue='1'>
                <option disabled value='1' hidden>
                  Selecione um DDD
                </option>
                <option>11</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
              </select>
              <legend>2. DDD do Destino</legend>
              <select defaultValue='1'>
                <option disabled value='1' hidden>
                  Selecione um DDD
                </option>
                <option>11</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
              </select>
              <legend>3. Tempo da ligação</legend>
              <input
                type='text'
                placeholder='Digite o tempo de ligação em minutos'
              />
            </fieldset>
            <div className='button-container'>
              <button>Simular</button>
            </div>
          </form>
        </div>
      </main>
      <div className='card-container'>
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
      </div>
    </div>
  );
}

export default MainPage;
