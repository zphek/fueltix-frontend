import { useState } from 'react';
import sendRequest from '@/utilities/sendRequest';

type TicketCardProps = {
  ticket: Ticket;
  index: number;
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
};

type Ticket = {
    fuelTicketId: string;
    expirationDate: string;
    amount: number;
    sequential: string;
    barcode_svg: string;
  };
  

export default function AssignmentTicket({ ticket, index, setTickets }: TicketCardProps) {
  const [showBarcode, setShowBarcode] = useState(false);
  const [requestState, setRequestState] = useState({ error: false, success: false, message: "" });

  function handleBarCode() {
    setShowBarcode(!showBarcode);
  }

  function handleDelete() {
    sendRequest(`/tickets/${ticket.fuelTicketId}`, "DELETE", {})
      .then(() => {
        setRequestState({
          error: false,
          success: true,
          message: "Se ha eliminado con éxito."
        });
        setTickets((prevTickets) => prevTickets.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.log(error);
        setRequestState({
          error: true,
          success: false,
          message: "No se ha logrado eliminar."
        });
      });
  }

  return (
    <>
      <div className="min-h-[60px] py-4 px-6 flex w-full justify-between relative rounded-xl overflow-hidden shadow-[0px_6px_25px_0px_#00000024] items-center">
        <div className="absolute h-full w-4 bg-[#00075D] top-0 -left-2"></div>
        <div className="pr-4">
          <input type="checkbox" name="" id="" className='scale-[160%]'/>
        </div>
        
        <div className="pr-4">
          <h2 className="text-[#00075D] font-bold">Matr&iacute;cula (ID)</h2>
          <h4>{ticket.expirationDate}</h4>
        </div>
        <div>
          <img src="/ticket.svg" alt="Ticket icon" />
        </div>
        <div className="pr-4">
          <h2 className="text-[#00075D] font-bold">Nombre</h2>
          <h4>{ticket.amount}</h4>
        </div>
        <div className="pr-4">
          <h2 className="text-[#00075D] font-bold">Monto asignado</h2>
          <h4>{ticket.sequential}</h4>
        </div>
      </div>
    </>
  );
}
