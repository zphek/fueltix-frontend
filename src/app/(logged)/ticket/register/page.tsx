import TicketCard from "@/components/TicketCard";

export default function Register(){
    return <main className="p-10 px-20 min-h-screen w-screen">
        <h1 className="text-5xl font-normal text-[#070085] h-16">Registrar Ticket</h1>
        <div className="flex flex-grow w-full justify-start  mt-5">
            <div className="grow flex flex-col gap-y-6 max-w-[600px]">
                <div className="flex flex-col">
                    <h2 className="text-[#00075D] text-xl font-bold">Denominaci&oacute;n</h2>
                    <input type="text" name="" id="" className="w-full outline-none rounded-full py-2 px-4 border-2 border-[#00075D]"/>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[#00075D] text-xl font-bold">Fecha de registro</h2>
                    <input type="date" name="" id="" className="w-full outline-none rounded-full py-2 px-4 border-2 border-[#00075D]"/>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[#00075D] text-xl font-bold">Ticket secuencial</h2>
                    <input type="text" name="" id="" className="w-full outline-none rounded-full py-2 px-4 border-2 border-[#00075D]"/>
                </div>

                <div className="text-white w-full flex justify-center gap-x-5">
                    <button className="py-2 px-6 rounded-full bg-[#00075D] ">
                        Guardar
                    </button>
                    
                    <button className="py-2 px-6 rounded-full bg-[#00075D]">
                        Cancelar
                    </button>
                </div>
            </div>

            <div className="px-20 flex flex-col items-center">
                <h3 className="w-28 h-28 rounded-full border-2 border-[#070085] text-[#070085] text-5xl flex justify-center items-center">
                    4
                </h3>
                <h2 className="text-xl text-[#00075D] font-semibold">Tickets</h2>

                <button className="py-2 px-6 rounded-full bg-[#00075D] text-white mt-10">
                    Concluir Proceso
                </button>
            </div>
        </div>

        <h1 className="text-3xl font-bold text-[#070085] h-16 mt-10">Actualizaciones</h1>
        <div className="flex flex-col max-h-[270px] min-w-full overflow-y-scroll gap-y-5">
            {[...Array(20)].map((_,index)=> <TicketCard key={index}/>)}
        </div>
    </main>
}