"use client"

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

export default function Register() {
  const [tickets, setTickets] = useState<TicketForm[]>([]);
  const [registeredTickets, setRegisteredTickets] = useState<RegisteredTicketForm[]>([]);
  const [denomination, setDenomination] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [sequential, setSequential] = useState("");
  const [error, setError] = useState("");
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
    <main className="p-10 px-20 min-h-screen w-screen">
      <h1 className="text-5xl font-normal text-[#070085] h-16">Registrar Ticket</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {creation && (
        <p className={`mb-4 ${creation.error ? 'text-red-500' : 'text-green-500'}`}>
          {creation.message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-grow w-full justify-start mt-5">
        <div className="grow flex flex-col gap-y-6 max-w-[600px]">
          <Dropdown options={[200, 500, 1000, 2000]} title="Denominación" setCurrent={setDenomination} />
          <div className="flex flex-col">
            <h2 className="text-[#00075D] text-xl font-bold">Fecha de registro</h2>
            <input 
              type="date" 
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full outline-none rounded-full py-2 px-4 border-2 border-[#00075D]"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[#00075D] text-xl font-bold">Ticket secuencial</h2>
            <input 
              type="text" 
              value={sequential}
              onChange={(e) => setSequential(e.target.value)}
              className="w-full outline-none rounded-full py-2 px-4 border-2 border-[#00075D]"
            />
          </div>
          <div className="text-white w-full flex justify-center gap-x-5">
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
        </div>
        <div className="px-20 flex flex-col items-center">
          <h3 className="w-28 h-28 rounded-full border-2 border-[#070085] text-[#070085] text-5xl flex justify-center items-center">
            {tickets.length}
          </h3>
          <h2 className="text-xl text-[#00075D] font-semibold">Tickets</h2>
          <button 
            className="py-2 px-6 rounded-full bg-[#00075D] text-white mt-10"
            onClick={registerTickets}
            disabled={tickets.length === 0}
          >
            Concluir Proceso
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