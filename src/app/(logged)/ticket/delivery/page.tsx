"use client"
import React, { useEffect, useReducer } from 'react';
import Dropdown from "@/components/Dropdown";
import DeliveryTicketCard from '@/components/DeliveryTicketCard';
import sendRequest from '@/utilities/sendRequest';
import Denomination from '@/components/Denomination';
import ComplexDropdown from '@/components/ComplexDropdown';

// Define las acciones
const SET_CONDUCTOR = 'SET_CONDUCTOR';
const SET_VEHICULO = 'SET_VEHICULO';
const SET_DEPARTAMENTO = 'SET_DEPARTAMENTO';
const SET_PROVINCIA = 'SET_PROVINCIA';
const SET_MUNICIPIO = 'SET_MUNICIPIO';
const SET_VEHICULOS = 'SET_VEHICULOS';
const SET_DEPARTAMENTOS = 'SET_DEPARTAMENTOS';

// Define el reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CONDUCTOR:
      return { ...state, conductor: action.payload };
    case SET_VEHICULO:
      return { ...state, vehiculo: action.payload };
    case SET_DEPARTAMENTO:
      return { ...state, departamento: action.payload };
    case SET_PROVINCIA:
      return { ...state, provincia: action.payload };
    case SET_MUNICIPIO:
      return { ...state, municipio: action.payload };
    case SET_VEHICULOS:
      return { ...state, vehiculos: action.payload };
    case SET_DEPARTAMENTOS:
      return { ...state, departamentos: action.payload };
    default:
      return state;
  }
};

export default function Delivery() {
  const [state, dispatch] = useReducer(reducer, {
    conductor: null,
    vehiculo: null,
    departamento: null,
    provincia: null,
    municipio: null,
    vehiculos: [],
    departamentos: [],
  });

  const [totalAmount, setTotalAmount] = React.useState(0);

  useEffect(() => {
    sendRequest("/company/departments", "GET", {})
      .then(({data}) => {
        console.log(data);
        dispatch({ type: SET_DEPARTAMENTOS, payload: data });
      });

    sendRequest("/company/vehicles", "GET", {})
      .then(({data}) => {
        console.log(data);
        dispatch({ type: SET_VEHICULOS, payload: data });
      });
  }, []);

  const handleDenominationChange = (e, value) => {
    const inputValue = parseInt(e.target.value) || 0;
    setTotalAmount(prevTotal => prevTotal + inputValue * value);
  };

  return (
    <main className="p-4 md:p-10 lg:px-20 min-h-screen max-h-screen overflow-y-scroll w-full">
      <h1 className="text-3xl md:text-5xl font-normal text-[#070085] mb-6">Entrega Ticket</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-20 md:gap-y-5">
        <ComplexDropdown 
          title="Conductor" 
          options={[]} 
          setCurrent={(value) => dispatch({ type: SET_CONDUCTOR, payload: value })} 
        />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Razón</h2>
          <textarea className="w-full p-2 border-2 border-[#070085] outline-none rounded-md" rows="2"></textarea>
        </div>
        <ComplexDropdown 
          title="Vehiculo" 
          options={state.vehiculos} 
          setCurrent={(value) => dispatch({ type: SET_VEHICULO, payload: value })} 
          idKey={"id"} 
          valueKey={"model"} 
        />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Fecha viaje</h2>
          <input type="date" className="w-full py-3 px-2 rounded-xl border-2 border-[#00075D]" />
        </div>
        <ComplexDropdown 
          title="Departamento" 
          options={state.departamentos} 
          setCurrent={(value) => dispatch({ type: SET_DEPARTAMENTO, payload: value })} 
          idKey={"id"} 
          valueKey={"name"}
        />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Cantidad</h2>
          <input type="number" className="w-full py-2 px-2 rounded-xl border-2 border-[#00075D]" />
        </div>
        <Dropdown 
          title="Provincia" 
          options={[]} 
          setCurrent={(value) => dispatch({ type: SET_PROVINCIA, payload: value })} 
        />
        <Denomination onChange={handleDenominationChange} />
        <Dropdown 
          title="Municipio" 
          options={[]} 
          setCurrent={(value) => dispatch({ type: SET_MUNICIPIO, payload: value })} 
        />
        <Denomination onChange={handleDenominationChange} />
      </section>
      <div className='flex gap-x-5'>
        <button className='py-2 px-8 text-white rounded-full bg-[#00075D]'>
          Guardar
        </button>
        <button className='py-2 px-8 text-white rounded-full bg-[#00075D]'>
          Cancelar
        </button>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#070085] mt-10 mb-6">Detalles</h1>
      <div className="flex flex-col max-h-[270px] min-w-full overflow-auto gap-y-5">
        {[...Array(20)].map((_, index) => <DeliveryTicketCard key={index}/>)}
      </div>
    </main>
  );
}