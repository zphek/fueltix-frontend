"use client";
import React, { useEffect, useReducer, useState } from "react";
import Dropdown from "@/components/Dropdown";
import DeliveryTicketCard from "@/components/DeliveryTicketCard";
import sendRequest from "@/utilities/sendRequest";
import Denomination from "@/components/Denomination";
import ComplexDropdown from "@/components/ComplexDropdown";

interface Availability {
  amount200: number;
  amount500: number;
  amount1000: number;
  amount2000: number;
}

// Define las acciones
const SET_CONDUCTOR = "SET_CONDUCTOR";
const SET_VEHICULO = "SET_VEHICULO";
const SET_DEPARTAMENTO = "SET_DEPARTAMENTO";
const SET_PROVINCIA = "SET_PROVINCIA";
const SET_MUNICIPIO = "SET_MUNICIPIO";
const SET_VEHICULOS = "SET_VEHICULOS";
const SET_DEPARTAMENTOS = "SET_DEPARTAMENTOS";

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

export interface Delivery {
  assignmentId: number;
  employee: string;
  department: string;
  province: string;
  reason: string;
  travelDate: string;
  vehicle: string;
  amount200: number;
  amount500: number;
  amount1000: number;
  amount2000: number;
}

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

  const [availability, setAvailability] = useState({
    amount200: 0,
    amount500: 0,
    amount1000: 0,
    amount2000: 0,
    total: 0,
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [reason, setReason] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const [deliveryList, setDeliveryList] = useState<Delivery[]>([]);

  useEffect(() => {
    sendRequest("/company/departments", "GET", {}).then(({ data }) => {
      dispatch({ type: SET_DEPARTAMENTOS, payload: data });
    });

    sendRequest("/company/vehicles", "GET", {}).then(({ data }) => {
      dispatch({ type: SET_VEHICULOS, payload: data });
    });

    sendRequest("/company/drivers", "GET", {}).then(({ data }) => {
      dispatch({ type: SET_CONDUCTOR, payload: data });
    });

    sendRequest("/tickets/summary", "GET", {}).then(({ data }) => {
      console.log("Setting availability: ", data);
      setAvailability({
        amount200: data.amount200,
        amount500: data.amount500,
        amount1000: data.amount1000,
        amount2000: data.amount2000,
        total:
          200 * data.amount200 +
          500 * data.amount500 +
          1000 * data.amount1000 +
          2000 * data.amount2000,
      });
    });

    sendRequest("/ticket-assignments/", "GET", {}).then(({ data }) => {
      const list: any[] = data;
      // leave only the elements where vehicle is not null
      const filteredList = list.filter((item) => item.vehicle);
      setDeliveryList(filteredList);
      console.log("Delivery list: ", filteredList);
    });
  }, []);

  const onSave = () => {
    if (availability.total < totalAmount) {
      setError("No hay suficientes tickets. Compruebe la disponibilidad.");
      return;
    }

    if (totalAmount != quantity) {
      setError("La cantidad de tickets no coincide con la cantidad ingresada.");
      return;
    }
    sendRequest("/delivery", "POST", {
      employee: state.conductor.name,
      department: state.departamento.name,
      vehicle: state.vehiculo.model,
      province: state.provincia,
      amount200: availability.amount200,
      amount500: availability.amount500,
      amount1000: availability.amount1000,
      amount2000: availability.amount2000,
      reason,
      travelDate,
    }).then(({ data }) => {
      console.log("Saved: ", data);
      setDeliveryList((prevList) => [...prevList, data]);
    });
    console.log("Clearing form");
    // clear
    setTotalAmount(0);
    setReason("");
    setTravelDate("");
    setQuantity(0);
    dispatch({ type: SET_CONDUCTOR, payload: null });
    dispatch({ type: SET_VEHICULO, payload: null });
    dispatch({ type: SET_DEPARTAMENTO, payload: null });
    dispatch({ type: SET_PROVINCIA, payload: null });
    dispatch({ type: SET_MUNICIPIO, payload: null });
  };

  const [error, setError] = useState("");
  const handleDenominationChange = (e, value) => {
    const inputValue = parseInt(e.target.value) || 0;
    setTotalAmount((prevTotal) => prevTotal + inputValue * value);
    console.log("handleDenominationChange: ", totalAmount);
  };

  const [quantity, setQuantity] = useState(0);
  return (
    <main className="p-4 md:p-10 lg:px-20 min-h-screen max-h-screen overflow-y-scroll w-full">
      <h1 className="text-3xl md:text-5xl font-normal text-[#070085] mb-6">
        Entrega Ticket
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-20 md:gap-y-5">
        <ComplexDropdown
          title="Conductor"
          options={state.conductor}
          setCurrent={(value) =>
            dispatch({ type: SET_CONDUCTOR, payload: value })
          }
          valueKey={"name"}
        />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Razón</h2>
          <textarea
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border-2 border-[#070085] outline-none rounded-md"
            rows="2"
          ></textarea>
        </div>
        <ComplexDropdown
          title="Vehiculo"
          options={state.vehiculos}
          setCurrent={(value) =>
            dispatch({ type: SET_VEHICULO, payload: value })
          }
          idKey={"id"}
          valueKey={"model"}
        />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Fecha viaje</h2>
          <input
            onChange={(e) => setTravelDate(e.target.value)}
            type="date"
            className="w-full py-3 px-2 rounded-xl border-2 border-[#00075D]"
          />
        </div>
        <ComplexDropdown
          title="Departamento"
          options={state.departamentos}
          setCurrent={(value) =>
            dispatch({ type: SET_DEPARTAMENTO, payload: value })
          }
          idKey={"id"}
          valueKey={"name"}
        />
        <div className="w-full">
          <h2 className="text-[#070085] font-bold text-xl mb-2">Cantidad</h2>
          <input
            type="number"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full py-2 px-2 rounded-xl border-2 border-[#00075D]"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="provincia"
            className="text-[#00075D] text-xl font-bold"
          >
            Provincia
          </label>
          <input
            id="provincia"
            onChange={(e) =>
              dispatch({ type: SET_PROVINCIA, payload: e.target.value })
            }
            type="text"
            value={state.provincia}
            className="w-full mt-2 outline-none rounded-full py-2 px-4 border-2 border-[#00075D]"
          />
        </div>
        <Denomination
          onChange={handleDenominationChange}
          title="Denominación"
        />
        <div className="flex flex-col">
          <label
            htmlFor="municipio"
            className="text-[#00075D] text-xl font-bold"
          >
            Municipio
          </label>
          <input
            id="municipio"
            onChange={(e) =>
              dispatch({ type: SET_MUNICIPIO, payload: e.target.value })
            }
            type="text"
            value={state.municipio}
            className="w-full mt-2 outline-none rounded-full py-2 px-4 border-2 border-[#00075D]"
          />
        </div>
        <Denomination
          title="Disponibilidad"
          availability={availability}
          onChange={handleDenominationChange}
        />
      </section>
      <div className="flex gap-x-5">
        <button
          className="py-2 px-8 text-white rounded-full bg-[#00075D]"
          onClick={onSave}
        >
          Guardar
        </button>
        <button className="py-2 px-8 text-white rounded-full bg-[#00075D]">
          Cancelar
        </button>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#070085] mt-10 mb-6">
        Actualizaciones
      </h1>
      <div className="flex flex-col max-h-[270px] min-w-full overflow-auto gap-y-5">
        {deliveryList.length == 0 && (
          <p className="text-[#00075D] text-lg">No hay entregas registradas.</p>
        )}
        {deliveryList.map((delivery) => (
          <DeliveryTicketCard
            delivery={delivery}
            onDelete={() => {
              sendRequest(
                `/delivery/${delivery.assignmentId}`,
                "POST",
                {}
              ).then(({ data }) => {
                console.log("Deleted: ", data);
                setDeliveryList((prevList) => {
                  return prevList.filter(
                    (item) => item.assignmentId != delivery.assignmentId
                  );
                });
              });
            }}
          />
        ))}
      </div>
    </main>
  );
}
