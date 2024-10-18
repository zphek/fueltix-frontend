"use client"

import AssignmentTicket from "@/components/AssignmentTicket";
import Denomination from "@/components/Denomination";
import Dropdown from "@/components/Dropdown";
import TicketCard from "@/components/TicketCard";
import sendRequest from "@/utilities/sendRequest";
import { useState, FormEvent, useEffect } from "react";

type TicketForm = {
  amount: string;
  sequential: string;
  expirationDate: string;
}

type RegisteredTicketForm = {
    amount: string;
    sequential: string;
    expirationDate: string;
    barcode: string;
    barcode_svg: string;
  }

type RequestResponse = {
  error: boolean;
  success: boolean;
  message: string;
}

export default function Assigment() {
  const [tickets, setTickets] = useState<TicketForm[]>([]);
  const [registeredTickets, setRegisteredTickets] = useState<RegisteredTicketForm[]>([]);
  const [denomination, setDenomination] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [sequential, setSequential] = useState("");
  const [error, setError] = useState("");
  const [drivers, setDrivers] = useState();
  const [creation, setCreation] = useState<RequestResponse | null>(null);

  useEffect(()=>{
    sendRequest("/tickets", "GET", null)
    .then(({data})=>{
        setRegisteredTickets((tickets)=> [...tickets, ...data])
        console.log(data)
    })
  }, [])

  const registerTickets = async () => {
    try {
      await sendRequest("/tickets", "POST", tickets);
      setCreation({
        error: false,
        success: true,
        message: "Los tickets fueron agregados correctamente!"
      });
      setTickets([]); // Clear tickets after successful registration
    } catch (err) {
      setCreation({
        error: true,
        success: false,
        message: "Hubo un error a la hora de insertar los tickets."
      });
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!denomination || !expirationDate || !sequential) {
      setError("Faltan campos por llenar.");
      return;
    }
    const newTicket: TicketForm = {
      amount: denomination,
      sequential: sequential,
      expirationDate: expirationDate
    };
    setTickets([...tickets, newTicket]);
    setError("");
    // Reset form fields
    setDenomination("");
    setExpirationDate("");
    setSequential("");
  };

  useEffect(() => {
    if (creation) {
      const timer = setTimeout(() => setCreation(null), 5000); // Clear creation message after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [creation]);

  return (
    <main className="p-10 px-20 min-h-screen max-h-screen overflow-y-scroll w-screen">
      <h1 className="text-5xl font-normal text-[#070085] h-16">Asignar Ticket</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {creation && (
        <p className={`mb-4 ${creation.error ? 'text-red-500' : 'text-green-500'}`}>
          {creation.message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow w-full justify-start mt-5">
        <div className="flex w-full">
          <div className="grow flex flex-col gap-y-6 max-w-[600px]">
            <div className="flex flex-col">
              <h2 className="text-[#00075D] text-xl font-bold">A&ntilde;o Asignamiento</h2>
              <input 
                type="number" 
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="w-full outline-none rounded-full py-2 px-4 border-2 border-[#00075D]"
              />
            </div>
            
            <Dropdown options={[1,2,3,4,5,6,7,8,9,10,11,12]} title="Mes" setCurrent={setDenomination} />
          </div>
          <div className="px-20 flex flex-col items-center">
            <Denomination/>

            <button 
              className="py-2 px-6 rounded-full bg-[#00075D] text-white mt-10"
              onClick={registerTickets}
              disabled={tickets.length === 0}
            >
              Concluir Proceso
            </button>
          </div>
        </div>

        <div className="flex flex-col max-h-[400px] gap-y-5 overflow-y-scroll py-5 px-5 mt-5 w-full">
        {registeredTickets.map((ticket, index) => (
          <AssignmentTicket 
            key={index} 
            ticket={ticket}
            svg={ticket.barcode_svg}
            id={index}
            setItems={setTickets} 
          />
        ))}
        </div>

        <div className="text-white w-full flex justify-center gap-x-5 mt-5">
              <button type="submit" className="py-2 px-6 rounded-full bg-[#00075D]">
                Guardar
              </button>
              <button type="button" onClick={() => {
                setDenomination("");
                setExpirationDate("");
                setSequential("");
                setError("");
                setTickets(()=>[])
              }} className="py-2 px-6 rounded-full bg-[#00075D]">
                Cancelar
              </button>
            </div>
      </form>
      <h1 className="text-3xl font-bold text-[#070085] h-16 mt-10">Actualizaciones</h1>
      <div className="flex flex-col max-h-[270px] min-w-full overflow-y-scroll gap-y-5">
        {tickets.map((ticket, index) => (
          <TicketCard 
            key={index} 
            ticket={ticket}
            id={index}
            setItems={setTickets} 
          />
        ))}

        {registeredTickets.map((ticket, index) => (
          <TicketCard 
            key={index} 
            ticket={ticket}
            svg={ticket.barcode_svg}
            id={index}
            setItems={setTickets} 
          />
        ))}
      </div>
    </main>
  )
}