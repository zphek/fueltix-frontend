"use client";

import Dropdown from "@/components/Dropdown";
import TicketCard from "@/components/TicketCard";
import sendRequest from "@/utilities/sendRequest";
import { useState, useEffect } from "react";

type Ticket = {
  amount: string;
  sequential: string;
  expirationDate: string;
  barcode: number;
  status: "in-memory" | "editing" | "registered";
};

type RegisteredTicket = {
  fuelTicketId: number;
  amount: string;
  sequential: string;
  expirationDate: string;
  barcode: number;
  barcode_svg: string;
  status: "in-memory" | "editing" | "registered";
};

type RequestResponse = {
  error: boolean;
  success: boolean;
  message: string;
};

export default function Register() {
  // Form state
  const [denomination, setDenomination] = useState("200");
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

  const [ticketBeingEdited, setTicketBeingEdited] =
    useState<RegisteredTicket | null>();

  useEffect(() => {
    sendRequest("/tickets", "GET", null).then(({ data }) => {
      setRegisteredTickets([...data]);
    });
  }, []);

  const registerTickets = async () => {
    try {
      // convert ticket amounts to strings
      const ticketsToRegister = tickets.map((ticket) => ({
        ...ticket,
        amount: ticket.amount.toString(),
      }));
      const response = await sendRequest("/tickets", "POST", ticketsToRegister);
      setRegisteredTickets((prevTickets) => [...response.data, ...prevTickets]);
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

  const updateTicket = async () => {
    if (!ticketBeingEdited) return;
    try {
      const response = await sendRequest(
        `tickets/${ticketBeingEdited.fuelTicketId}`,
        "PATCH",
        {
          amount: denomination,
          sequential: sequential,
          expirationDate: registrationDate,
          barcode: Number(barcode),
        }
      );
      setRegisteredTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.fuelTicketId === ticketBeingEdited.fuelTicketId
            ? response.data
            : ticket
        )
      );
      setCreation({
        error: false,
        success: true,
        message: "El ticket fue actualizado correctamente!",
      });
      setTickets([]); // Clear tickets after successful registration
      setTicketBeingEdited(null);
      clearForm();
    } catch (err) {
      setCreation({
        error: true,
        success: false,
        message: "Hubo un error a la hora de actualizar el ticket.",
      });
    }
  };

  const insertTicket = () => {
    // e.preventDefault();
    if (!denomination || !registrationDate || !sequential || !barcode) {
      setError("Faltan campos por llenar.");
      return;
    }
    const newTicket: Ticket = {
      amount: denomination,
      sequential: sequential,
      expirationDate: registrationDate,
      barcode: Number(barcode),
      status: "in-memory",
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

  const handleEditing = (ticket: RegisteredTicket) => {
    setDenomination(ticket.amount);
    setRegistrationDate(ticket.expirationDate);
    setSequential(ticket.sequential);
    setBarcode(ticket.barcode.toString());
    setTicketBeingEdited(ticket);
  };

  const inMemoryTickets = tickets.map((ticket, index) => {
    return (
      <TicketCard
        barcode_svg=""
        onEdit={() => {}}
        onDelete={() => {
          setTickets((prevTickets) =>
            prevTickets.filter((_, i) => i !== index)
          );
        }}
        initialStatus={ticket.status}
        key={index}
        date={ticket.expirationDate}
        denomination={ticket.amount}
        sequential={ticket.sequential}
        barcode={ticket.barcode}
      />
    );
  });

  const registeredTicketsCards = registeredTickets.map((ticket, index) => {
    return (
      <TicketCard
        barcode_svg={ticket.barcode_svg}
        onEdit={() => {
          handleEditing(ticket);
        }}
        onDelete={async () => {
          await sendRequest(`/tickets/${ticket.fuelTicketId}`, "DELETE", {});
          setRegisteredTickets((prevTickets) =>
            prevTickets.filter((_, i) => i !== index)
          );
        }}
        initialStatus={
          ticketBeingEdited?.fuelTicketId === ticket.fuelTicketId
            ? "editing"
            : ticket.status
        }
        key={index}
        // svg={ticket.barcode_svg}
        date={ticket.expirationDate}
        denomination={ticket.amount}
        sequential={ticket.sequential}
        barcode={ticket.barcode}
      />
    );
  });

  const clearForm = () => {
    setDenomination("");
    setRegistrationDate("");
    setSequential("");
    setError("");
    setBarcode("");
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
        className="flex flex-grow w-full justify-between mt-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grow flex flex-col gap-y-6 max-w-[600px]">
          <Dropdown
            value={denomination}
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
          <div className="text-white w-full font-bold flex justify-center gap-x-5">
            <button
              onClick={() => {
                if (ticketBeingEdited) {
                  updateTicket();
                } else {
                  insertTicket();
                }
              }}
              type="submit"
              className="py-2 px-12 rounded-full bg-[#00075D]"
            >
              {ticketBeingEdited ? "Actualizar" : "Guardar"}
            </button>

            <button
              type="button"
              onClick={() => {
                clearForm();
                setTickets(() => []);
                setTicketBeingEdited(null);
              }}
              className="py-2  px-12 rounded-full bg-[rgb(0,7,93)]"
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
      <div className="flex justify-between max-w-screen-xl">
        <h1 className="title !text-3xl mt-7">Actualizaciones</h1>
        <div className="flex gap-x-5 mt-5">
          <div className="flex items-center gap-x-2">
            <div className="w-4 h-4 bg-[#468d40] rounded-full"></div>
            <p>En Proceso</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="w-4 h-4 bg-[#ff6600] rounded-full"></div>
            <p>En Edición</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="w-4 h-4 bg-[#00075D] rounded-full"></div>
            <p>Registrado</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-h-[300px] min-w-full overflow-y-scroll gap-y-5">
        {inMemoryTickets.length === 0 &&
          registeredTicketsCards.length === 0 && (
            <p className="text-[#00075D] text-lg ">
              No hay tickets disponibles.
            </p>
          )}
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
