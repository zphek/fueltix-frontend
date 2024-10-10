export default function Cancel(){
    const tickets = [
        { 
          deliveryId: '001', 
          employeeNumber: 'E123', 
          fullName: 'John Doe', 
          travelDate: '2024-10-15', 
          amount: 500, 
          travelReason: 'Business Meeting', 
          vehiclesId: 'V001', 
          ficha: 'F123', 
          model: 'Sedan', 
          vehiclePlate: 'ABC123', 
          chasis: 'CH001', 
          status: 'Active' 
        },
        // Add more sample data as needed
      ];
    
      return (
        <main className="p-10 px-20 min-h-screen min-w-screen">
          <h1 className="text-5xl font-normal text-[#070085] mb-8">Cancel Ticket</h1>

          <form className="flex items-center mb-5 gap-x-4">
            <div className="flex flex-col gap-y-2">
                <h2 className="text-[#00075D] font-bold">DeliveryID</h2>
                <input type="text" name="" id="" className="px-4 py-2 w-[200px] border-2 border-[#00075D] rounded-full" />
            </div>

            <div>
                <h2>EmployeeID</h2>
                <input type="text" name="" id="" />
            </div>

            <button className="bg-[#00075D] text-white py-2 px-6 rounded-xl">
                Buscar
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">DeliveryID</th>
                  <th className="py-2 px-4 border-b">EmployeeNumber</th>
                  <th className="py-2 px-4 border-b">FullName</th>
                  <th className="py-2 px-4 border-b">TravelDate</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">TravelReason</th>
                  <th className="py-2 px-4 border-b">VehiclesID</th>
                  <th className="py-2 px-4 border-b">Ficha</th>
                  <th className="py-2 px-4 border-b">Model</th>
                  <th className="py-2 px-4 border-b">VehiclePlate</th>
                  <th className="py-2 px-4 border-b">Chasis</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Cancel</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{ticket.deliveryId}</td>
                    <td className="py-2 px-4 border-b">{ticket.employeeNumber}</td>
                    <td className="py-2 px-4 border-b">{ticket.fullName}</td>
                    <td className="py-2 px-4 border-b">{ticket.travelDate}</td>
                    <td className="py-2 px-4 border-b">{ticket.amount}</td>
                    <td className="py-2 px-4 border-b">{ticket.travelReason}</td>
                    <td className="py-2 px-4 border-b">{ticket.vehiclesId}</td>
                    <td className="py-2 px-4 border-b">{ticket.ficha}</td>
                    <td className="py-2 px-4 border-b">{ticket.model}</td>
                    <td className="py-2 px-4 border-b">{ticket.vehiclePlate}</td>
                    <td className="py-2 px-4 border-b">{ticket.chasis}</td>
                    <td className="py-2 px-4 border-b">
                        <input type="checkbox" name="" id="" checked={true}/>
                    </td>
                    <td className="py-2 px-4 border-b">
                        <button className="flex items-center justify-center">
                            <img src="/close.svg" className="h-4" alt="" />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      );
    
}