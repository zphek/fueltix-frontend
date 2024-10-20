import { useState } from "react";

interface Props {
  title: string;
  availability?: {
    amount200: number;
    amount500: number;
    amount1000: number;
    amount2000: number;
    total: number;
  };
  onChange: any;
}
export default function Denomination({ title, availability, onChange }: Props) {
  const [totalAmount, setTotalAmount] = useState({
    amount200: availability?.amount200 || 0,
    amount500: availability?.amount500 || 0,
    amount1000: availability?.amount1000 || 0,
    amount2000: availability?.amount2000 || 0,
    total: availability
      ? Object.values(availability).reduce((acc, curr) => acc + curr, 0)
      : 0,
  });

  const handleDenominationChange = (e, value) => {
    const inputValue = Math.max(0, parseInt(e.target.value) || 0);
    const previousValue = totalAmount[`amount${value}`];
    onChange(e, value);

    setTotalAmount((prevState) => {
      const newAmount = inputValue * value;
      const newTotal = Math.max(
        0,
        prevState.total - previousValue * value + newAmount
      );

      return {
        ...prevState,
        [`amount${value}`]: inputValue,
        total: newTotal,
      };
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-[#070085] font-bold text-xl mb-2">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {[200, 500, 1000, 2000].map((value) => (
          <div key={value} className="flex flex-col items-center">
            <input
              disabled={availability}
              type="text"
              className="w-16 p-2 border-2 border-[#00075D] rounded-md text-center"
              onChange={(e) => {
                if (!availability) {
                  handleDenominationChange(e, value);
                }
              }}
              name={`amount${value}`}
              // value={totalAmount[`amount${value}`] || ""}
              value={
                availability
                  ? availability[`amount${value}`]
                  : totalAmount[`amount${value}`]
              }
            />
            <h6 className="mt-1">{value}</h6>
          </div>
        ))}
        <div className="flex flex-col items-center">
          <input
            type="text"
            className="w-20 p-2 border-2 border-[#00075D] rounded-md text-center"
            // value={totalAmount.total}
            value={availability ? availability.total : totalAmount.total}
            readOnly
          />
          <h6 className="mt-1">Total</h6>
        </div>
      </div>
    </div>
  );
}
