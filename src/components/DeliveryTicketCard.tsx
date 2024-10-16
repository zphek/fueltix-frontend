export default function DeliveryTicketCard(){
    return <div className="min-h-[60px] py-4 px-6 flex w-full justify-between relative rounded-xl overflow-hidden shadow-[0px_6px_25px_0px_#00000024] items-center">

        <div className="absolute h-full w-4 bg-[#00075D] top-0 -left-2">

        </div>

        <div className="pr-4">
            <h2 className="text-[#00075D] font-bold">Conductor</h2>
            <h4>10/11/2024</h4>
        </div>

        <div className="pr-4">
            <h2 className="text-[#00075D] font-bold">Raz&oacute;n</h2>
            <h4>10/11/2024</h4>
        </div>


        <div className="pr-4">
            <h2 className="text-[#00075D] font-bold">Provincia</h2>
            <h4>----------</h4>
        </div>

        <div className="pr-4">
            <h2 className="text-[#00075D] font-bold">Denominaci&oacute;n</h2>
            <h4>-----------</h4>
        </div>

        <div className="pr-4">
            <h2 className="text-[#00075D] font-bold">Disponibilidad</h2>
            <h4>-----------</h4>
        </div>

        <div>
            <img src="/ticket.svg" alt="" />
        </div>

        <div className="flex gap-x-5">
            <img src="/edit.svg" alt="" />
            <img src="/print.svg" alt="" />
            <img src="/close.svg" alt="" />
        </div>
    </div>
}