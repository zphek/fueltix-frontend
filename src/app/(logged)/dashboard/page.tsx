"use client";

import { useUserStore } from "@/store/user";
import sendRequest from "@/utilities/sendRequest";
import { useEffect, useState } from "react";

interface TicketSummary {
  amount200: number;
  amount500: number;
  amount1000: number;
  amount2000: number;
}

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const [ticketSummary, setTicketSummary] = useState<TicketSummary>({
    amount200: 0,
    amount500: 0,
    amount1000: 0,
    amount2000: 0,
  });
  useEffect(() => {
    const getTicketSummary = async () => {
      try {
        console.log("Getting ticket summary");
        const response = await sendRequest("tickets/summary", "GET", {});
        setTicketSummary(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getTicketSummary();
  }, []);

  return (
    <main className="p-4 md:p-10 lg:px-20">
      <h1 className="text-5xl text-primary">Resumen de Tickets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-8 text-center">
        <div className="bg-white rounded-lg shadow-md px-12 py-7">
          <h2 className="text-[#00075D] text-xl font-bold">200</h2>
          <p className="text-[#00075D] text-md">
            {ticketSummary.amount200}
            {""} Disponibles
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md px-12 py-7">
          <h2 className="text-[#00075D] text-xl font-bold">500</h2>
          <p className="text-[#00075D] text-md">
            {ticketSummary.amount500}
            {""} Disponibles
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md px-12 py-7">
          <h2 className="text-[#00075D] text-xl font-bold">1000</h2>
          <p className="text-[#00075D] text-md">
            {ticketSummary.amount1000}
            {""} Disponibles
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md px-12 py-7">
          <h2 className="text-[#00075D] text-xl font-bold">2000</h2>
          <p className="text-[#00075D] text-md">
            {ticketSummary.amount2000}
            {""} Disponibles
          </p>
        </div>
      </div>
    </main>
  );
}
