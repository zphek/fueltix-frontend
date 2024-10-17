"use client"

import React, { useEffect, useState } from 'react';
import Dropdown from "@/components/Dropdown";
import DeliveryTicketCard from '@/components/DeliveryTicketCard';
import sendRequest from '@/utilities/sendRequest';

export default function Delivery() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [provincias, setProvincias] = useState("");

  useEffect(()=>{
    sendRequest("https://api.digital.gob.do/v1/territories/provinces", "GET", {})
    .then(({data})=>{
      setProvincias(data);
    })
  }, [])

  const handleDenominationChange = (e, value) => {
    const inputValue = parseInt(e.target.value) || 0;
    setTotalAmount(prevTotal => prevTotal + inputValue * value);
  };

  return (
    <main className="p-4 md:p-10 lg:px-20 min-h-screen max-h-screen overflow-y-scroll w-full">
      <h1 className="text-3xl md:text-5xl font-normal text-[#070085] mb-6">Entrega Ticket</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-20 md:gap-y-5">
        <Dropdown title="Conductor" options={[]} setCurrent={() => {}} />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Razón</h2>
          <textarea className="w-full p-2 border-2 border-[#070085] outline-none rounded-md" rows="2"></textarea>
        </div>
        
        <Dropdown title="Conductor" options={[]} setCurrent={() => {}} />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Fecha viaje</h2>
          <input type="date" className="w-full py-3 px-2 rounded-xl border-2 border-[#00075D]" />
        </div>
        
        <Dropdown title="Departamento" options={["xd", "xd"]} setCurrent={() => {}} />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Cantidad</h2>
          <input type="number" className="w-full py-2 px-2 rounded-xl border-2 border-[#00075D]" />
        </div>
        
        <Dropdown title="Provincia" options={[]} setCurrent={() => {}} />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Denominación</h2>
          <div className="flex flex-wrap gap-2">
            {[200, 500, 1000, 2000].map((value) => (
              <div key={value} className="flex flex-col items-center">
                <input
                  type="text"
                  className="w-16 p-2 border-2 border-[#00075D] rounded-md text-center"
                  onChange={(e) => handleDenominationChange(e, value)}
                />
                <h6 className="mt-1">{value}</h6>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <input
                type="text"
                className="w-20 p-2 border-2 border-[#00075D] rounded-md text-center"
                value={totalAmount}
                readOnly
              />
              <h6 className="mt-1">Total</h6>
            </div>
          </div>
        </div>
        
        <Dropdown title="Municipio" options={[]} setCurrent={() => {}} />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Disponibilidad</h2>
          <div className="flex flex-wrap gap-2">
            {[200, 500, 1000, 2000].map((value) => (
              <div key={value} className="flex flex-col items-center">
                <input
                  type="text"
                  className="w-16 p-2 border-2 border-[#00075D] rounded-md text-center"
                  onChange={(e) => handleDenominationChange(e, value)}
                />
                <h6 className="mt-1">{value}</h6>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <input
                type="text"
                className="w-20 p-2 border-2 border-[#00075D] rounded-md text-center"
                value={totalAmount}
                readOnly
              />
              <h6 className="mt-1">Total</h6>
            </div>
          </div>
        </div>
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
            {[...Array(20)].map((_,index)=> <DeliveryTicketCard key={index}/>)}
        </div>
    </main>
  );
}