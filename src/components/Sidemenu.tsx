"use client"

type route = {
    routeName: string,
    icon: string,
    link: string
}

export default function Sidemenu(){
    const routes:route[] = [{
        routeName: "Dashboard",
        icon: "dashboard.svg",
        link: "/dashboard"
    },
    {
        routeName: "Registrar Ticket",
        icon: "addpeople.svg",
        link: "/ticket/register"
    }, 
    {
        routeName: "Entregar Ticket",
        icon: "delivery.svg",
        link: "/ticket/delivery"
    },
    {
        routeName: "Asignar Ticker",
        icon: "assign.svg",
        link: "/ticket/asignment"
    },
    {
        routeName: "Reportes",
        icon: "reports.svg",
        link: "/reports"
    },
    {
        routeName: "Cancelar Ticket",
        icon: "cancel.svg",
        link: "/ticket/cancel"
    }]

    return <aside className="w-[430px] max-w-[430px] min-h-screen px-20 py-16 bg-[#00075D] flex flex-col justify-between items-center gap-y-5">

        <img src="fueltix-logo.svg" className="w-[140px]" alt="" />

        <div className="w-full flex flex-col items-center">
            <div className="w-[9em] h-[9em] rounded-full bg-slate-200">

            </div>
            <h2 className="text-white font-extrabold text-2xl">Bernardo B&aacute;ez</h2>
            <h4 className="text-xl font-semibold text-[#0EB0EE]">Administrador</h4>
        </div>

        <ul className="w-full sidemenu-options">
            {routes.map((route)=> <li key={route.routeName} onClick={()=> window.location.href = route.link}>
                <img src={route.icon} alt="" />
                <h2>{route.routeName}</h2>
            </li>)}
        </ul>

        <button className="w-full text-white flex justify-start gap-x-5 hover:border-r-2 hover:border-r-white px-5 py-2 transition-[300ms] text-lg">
            <img src="logout.svg" alt="" />
            <h2>Cerrar Sesi&oacute;n</h2>
        </button>
    </aside>
}