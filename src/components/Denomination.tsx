import { useState } from "react";

export default function Denomination(){
    const [totalAmount, setTotalAmount] = useState(0);
    
    const handleDenominationChange = (e, value) => {
        const inputValue = parseInt(e.target.value) || 0;
        setTotalAmount(prevTotal => prevTotal + inputValue * value);
    };

    return <div className="w-full">
    <h2 className="text-[#070085] font-bold text-xl mb-2">Disponibilidad</h2>
    <div className="flex flex-wrap gap-2">
      {[200, 500, 1000, 2000].map((value) => (
        <div key={value} className="flex flex-col items-center">
          <input
            type="text"
            className="w-16 p-2 border-2 border-[#00075D] rounded-md text-center"
            onChange={(e) => handleDenominationChange(e, value)}
          />
          <h6 className="mt-1">{value}</h6>
        </div>
      ))}
      <div className="flex flex-col items-center">
        <input
          type="text"
          className="w-20 p-2 border-2 border-[#00075D] rounded-md text-center"
          value={totalAmount}
          readOnly
        />
        <h6 className="mt-1">Total</h6>
      </div>
    </div>
  </div>
}