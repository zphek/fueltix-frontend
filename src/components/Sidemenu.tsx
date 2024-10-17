"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import sendRequest from "@/utilities/sendRequest";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";

type Route = {
  routeName: string;
  icon: string;
  link: string;
};

export default function Sidemenu() {
  const [isOpen, setIsOpen] = useState(false);

  const routes: Route[] = [
    {
      routeName: "Dashboard",
      icon: "dashboard.svg",
      link: "/dashboard",
    },
    {
      routeName: "Registrar Ticket",
      icon: "addpeople.svg",
      link: "/ticket/register",
    },
    {
      routeName: "Entregar Ticket",
      icon: "delivery.svg",
      link: "/ticket/delivery",
    },
    {
      routeName: "Asignar Ticket",
      icon: "assign.svg",
      link: "/ticket/assignment",
    },
    {
      routeName: "Reportes",
      icon: "reports.svg",
      link: "/reports",
    },
    {
      routeName: "Cancelar Ticket",
      icon: "cancel.svg",
      link: "/ticket/cancel",
    },
  ];

  const router = useRouter();
  const user = useUserStore((state) => state.user);

  if (!user) {
    return null;
  }
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 lg:hidden"
      >
        {isOpen ? <X className="text-white" size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`
        fixed lg:static top-0 left-0 z-30
        lg:min-w-[24rem] max-w-[24rem] md:w-[430px] min-h-screen 
        px-6 md:px-20 py-16 
        bg-[#00075D] 
        flex flex-col justify-between items-center gap-y-5
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <img src="/fueltix-logo.svg" className="w-[140px]" alt="Fueltix Logo" />

        <div className="w-full flex flex-col items-center">
          {/* <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-slate-200"></div> */}

          <img src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg" alt="" className="w-24 h-24 md:w-36 md:h-36 rounded-full" />
          <h2 className="text-white font-extrabold text-xl md:text-2xl mt-5">
            {user?.username}
          </h2>
          <h4 className="text-lg md:text-xl font-semibold text-[#0EB0EE]">
            {user?.role}
          </h4>
        </div>

        <ul className="w-full sidemenu-options">
          {routes.map((route) => (
            <li
              key={route.routeName}
              onClick={() => {
                router.push(route.link);
              }}
              className="flex items-center gap-x-3 text-white hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-200"
            >
              <img src={`/${route.icon}`} alt="" className="w-6 h-6" />
              <h2 className="text-sm md:text-base">{route.routeName}</h2>
            </li>
          ))}
        </ul>

        <button
          className="w-full text-white flex justify-start items-center gap-x-3 hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-200 text-sm md:text-base"
          onClick={() => {
            sendRequest("/auth/logout", "GET", null);
            window.location.href = "/location";
          }}
        >
          <img src="/logout.svg" alt="" className="w-6 h-6" />
          <h2>Cerrar Sesión</h2>
        </button>
      </aside>
    </>
  );
}
