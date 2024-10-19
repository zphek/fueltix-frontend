"use client";

import Dropdown from "@/components/Dropdown";
import TicketCard from "@/components/TicketCard";
import sendRequest from "@/utilities/sendRequest";
import { useState, FormEvent, useEffect } from "react";

type Ticket = {
  amount: string;
  sequential: string;
  expirationDate: string;
};

type RegisteredTicket = {
  amount: string;
  sequential: string;
  expirationDate: string;
  barcode: string;
  barcode_svg: string;
};

type RequestResponse = {
  error: boolean;
  success: boolean;
  message: string;
};

export default function Register() {
  // Form state
  const [denomination, setDenomination] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [sequential, setSequential] = useState("");
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState("");
  // State for in-memory tickets
  const [tickets, setTickets] = useState<Ticket[]>([]);
  // State for in-database tickets
  const [registeredTickets, setRegisteredTickets] = useState<
    RegisteredTicket[]
  >([]);

  const [creation, setCreation] = useState<RequestResponse | null>(null);

  useEffect(() => {
    sendRequest("/tickets", "GET", null).then(({ data }) => {
      setRegisteredTickets((tickets) => [...tickets, ...data]);
      console.log(data);
    });
  }, []);

  const registerTickets = async () => {
    try {
      await sendRequest("/tickets", "POST", tickets);
      setCreation({
        error: false,
        success: true,
        message: "Los tickets fueron agregados correctamente!",
      });
      setTickets([]); // Clear tickets after successful registration
    } catch (err) {
      setCreation({
        error: true,
        success: false,
        message: "Hubo un error a la hora de insertar los tickets.",
      });
    }
  };

  const insertTicket = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!denomination || !registrationDate || !sequential) {
      setError("Faltan campos por llenar.");
      return;
    }
    const newTicket: Ticket = {
      amount: denomination,
      sequential: sequential,
      expirationDate: registrationDate,
    };
    setTickets([...tickets, newTicket]);
    clearForm();
  };

  useEffect(() => {
    if (creation) {
      const timer = setTimeout(() => setCreation(null), 5000); // Clear creation message after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [creation]);

  const inMemoryTickets = tickets.map((ticket, index) => {
    return (
      <TicketCard
        key={index}
        ticket={ticket}
        id={index}
        setItems={setTickets}
      />
    );
  });

  const registeredTicketsCards = registeredTickets.map((ticket, index) => {
    return (
      <TicketCard
        key={index}
        ticket={ticket}
        svg={ticket.barcode_svg}
        id={index}
        setItems={setTickets}
      />
    );
  });

  const clearForm = () => {
    setDenomination("");
    setRegistrationDate("");
    setSequential("");
    setError("");
  };
  return (
    <main className="p-10 px-20 min-h-screen w-screen">
      <h1 className="title">Registrar Ticket</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {creation && (
        <p
          className={`mb-4 ${
            creation.error ? "text-red-500" : "text-green-500"
          }`}
        >
          {creation.message}
        </p>
      )}
      <form
        className="flex flex-grow w-full justify-start mt-5"
        onSubmit={insertTicket}
      >
        <div className="grow flex flex-col gap-y-6 max-w-[600px]">
          <Dropdown
            options={[200, 500, 1000, 2000]}
            title="Denominación"
            setCurrent={setDenomination}
          />

          <TextField
            type="date"
            label="Fecha de registro"
            value={registrationDate}
            changeCb={(e) => setRegistrationDate(e.target.value)}
          />

          <TextField
            type="number"
            label="Ticket secuencial"
            value={sequential}
            changeCb={(e) => setSequential(e.target.value)}
          />

          <TextField
            type="number"
            label="Código de barra"
            value={barcode}
            changeCb={(e) => setBarcode(e.target.value)}
          />
          <div className="text-white w-full flex justify-center gap-x-5">
            <button
              type="submit"
              className="py-2 px-6 rounded-full bg-[#00075D]"
            >
              Guardar
            </button>

            <button
              type="button"
              onClick={() => {
                clearForm();
                setTickets(() => []);
              }}
              className="py-2 px-6 rounded-full bg-[#00075D]"
            >
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

      <h1 className="title !text-3xl mt-10">Actualizaciones</h1>
      <div className="flex flex-col max-h-[300px] min-w-full overflow-y-scroll gap-y-5">
        {inMemoryTickets}
        {registeredTicketsCards}
      </div>
    </main>
  );
}

interface InputProps {
  label: string;
  value: string;
  type?: string;
  changeCb: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextField = ({ value, changeCb, type = "text", label }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-[#00075D] text-xl font-bold">
        {label}
      </label>
      <input
        id={label}
        type={type}
        onChange={changeCb}
        value={value}
        className="w-full mt-2 outline-none rounded-full py-2 px-4 border-2 border-[#00075D]"
      />
    </div>
  );
};
