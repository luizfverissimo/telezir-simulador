import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import PlanCard from '../../components/PlanCard';

import './styles.css';

function MainPage() {
  //armazena os DDDs de origem que vem da api
  const [fromLocations, setFromLocations] = useState([]);
  //armazena os DDDs de destino que vem da api
  const [toLocations, setToLocations] = useState([]);
  //Taxa da ligação
  const [tax, setTax] = useState('');
  //Armazena os minutos da ligação
  const [minutes, setMinutes] = useState(0);
  //Armazena os planos com os valores a serem pagos
  const [plans, setPlans] = useState([]);
  //contra o select DDD de destino
  const [defaultOption, setDefaultOption] = useState('1');

  //Pega os DDDs de origem da api e armazena
  const loadFromLocation = async () => {
    const { data } = await api.get('/taxes');
    setFromLocations(data);
  };
  //ao carregar a página executa a função
  useEffect(() => {
    loadFromLocation();
  }, []);

  //ao mudar o select DDD de origem ele salva o resultado DDD de destino proveniente da api
  const fromLocationSelectorHandler = async (value) => {
    //
    setToLocations([]);
    setTax('');
  
    const { data } = await api.get(`/taxes/${value}`);
    setToLocations(data);
    setDefaultOption('1');
  };

  //ao mudar o select DDD de destino, é salvo a taxa de de ligação
  const toLocationSelectorHandler = (value) => {
    const taxSelected = toLocations.filter((item) => item.to === value);
    setDefaultOption(value);
    setTax(taxSelected[0].value);
  };

  //função que calcula os valores da ligação por plano e armazena
  const plansValueToPayCalculator = (plans) => {
    plans.map((plan) => {
      const minutesBeyondThreshold = minutes - plan.threshold;
      if (minutesBeyondThreshold <= 0) {
        plan.valueToPay = 0.0;
      } else {
        const value = (tax * minutesBeyondThreshold * 1.1).toFixed(2);
        plan.valueToPay = value;
      }
    });

    return plans;
  };

  //ao pressionar o botão simular, valida se todos os campos estão preenchidos, chama a função de cálculo dos valores e armazena os resultados
  const simulateHandler = () => {
    const plansBase = [
      {
        name: 'FaleMais30',
        threshold: 30,
        valueToPay: 0,
        acquirable: true,
      },
      {
        name: 'FaleMais60',
        threshold: 60,
        valueToPay: 0,
        acquirable: true,
      },
      {
        name: 'FaleMais120',
        threshold: 120,
        valueToPay: 0,
        acquirable: true,
      },
      {
        name: 'Sem FaleMais',
        threshold: 0,
        valueToPay: 0,
        acquirable: false,
      },
    ];

    if (
      fromLocations.length === 0 ||
      toLocations.length === 0 ||
      tax === '' ||
      minutes === 0
    ) {
      alert('Você precisa preencher os campos para realizar a simulação');
      return;
    }

    const plansWithValue = plansValueToPayCalculator(plansBase);
    setPlans(plansWithValue);
  };

  return (
    <div id='main-page'>
      <header className='page-header'>
        <div id='header-content' >
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
              <select
                value={defaultOption}
                onChange={(e) => toLocationSelectorHandler(e.target.value)}
              >
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
                type='number'
                placeholder='Digite o tempo de ligação em minutos'
                onChange={(e) => setMinutes(e.target.value)}
              />
            </fieldset>
            <div className='button-container'>
              <button type='button' onClick={simulateHandler}>
                Simular
              </button>
            </div>
          </form>
        </div>
      </main>
      <div className='card-container'>
        <div className='grid-container'>
          {plans.map((plan, index) => {
            return (
              <PlanCard
                key={plan.name + index}
                planName={plan.name}
                price={plan.valueToPay}
                acquirable={plan.acquirable}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
