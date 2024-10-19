import { useState } from "react";

type LocalStatus = "in-memory" | "editing" | "registered";

interface Props {
  date: string;
  denomination: string;
  barcode: number;
  sequential: string;
  initialStatus: LocalStatus;
  barcode_svg: string;
  onDelete: () => void;
  onEdit: () => void;
}

export default function TicketCard({
  date,
  denomination,
  barcode,
  sequential,
  onDelete,
  initialStatus,
  onEdit,
  barcode_svg,
}: Props) {
  const [showBarcode, setShowBarcode] = useState(false);
  const [requestState, setRequestState] = useState({
    error: false,
    success: false,
    message: "",
  });

  function handleBarCode() {
    setShowBarcode(!showBarcode);
  }

  return (
    <>
      <div className="min-h-[80px] bg-white items-center px-6 flex w-full justify-around relative rounded-xl overflow-hidden max-w-screen-xl">
        <div
          className={`absolute h-full w-4 ${
            initialStatus === "in-memory"
              ? "bg-[#468d40]"
              : initialStatus === "editing"
              ? "bg-[#ff6600]"
              : "bg-[#00075D]"
          } top-0 -left-2`}
        ></div>
        <div>
          <h2 className="text-[#00075D] font-bold">Fecha</h2>
          <h4>{date}</h4>
        </div>

        <div>
          <img src="/ticket.svg" alt="Ticket icon" />
        </div>
        <div className="pr-4">
          <h2 className="text-[#00075D] font-bold">Denominación</h2>
          <h4>{denomination}</h4>
        </div>

        <div className="pr-4">
          <h2 className="text-[#00075D] font-bold">Secuencial</h2>
          <h4>{sequential}</h4>
        </div>
        <div className="pr-4">
          <h2 className="text-[#00075D] font-bold">Código barra</h2>
          <h4>{barcode}</h4>
        </div>
        <div className="flex gap-x-9">
          {initialStatus === "in-memory" ? (
            <div className="w-10"></div>
          ) : (
            <img
              src="/edit.svg"
              alt="Edit"
              className="cursor-pointer"
              onClick={() => {
                onEdit();
              }}
            />
          )}

          {initialStatus !== "in-memory" && (
            <img
              src="/print.svg"
              alt="Print"
              className="cursor-pointer"
              onClick={handleBarCode}
            />
          )}
          <img
            src="/close.svg"
            alt="Delete"
            className="cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>

      {showBarcode && (
        <div className="flex justify-center items-center absolute top-0 left-0 z-50 w-full h-[108vh] bg-black/50 backdrop-blur-lg">
          <div className="w-[400px] m-10 bg-white p-10">
            <h2 className="text-2xl text-center font-bold mb-10">
              CÓDIGO DE BARRA
            </h2>
            <div dangerouslySetInnerHTML={{ __html: barcode_svg }} />
            <button
              className="bg-[#00075D] ml-24 mt-12 text-white py-2 px-6 rounded-lg mb-10 cursor-pointer"
              onClick={() => setShowBarcode(false)}
            >
              CERRAR
            </button>
          </div>
        </div>
      )}

      {requestState.message && (
        <div
          className={`alert ${
            requestState.success ? "alert-success" : "alert-error"
          }`}
        >
          {requestState.message}
        </div>
      )}
    </>
  );
}
