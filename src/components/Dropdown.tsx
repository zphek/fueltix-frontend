"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function Dropdown({ title, setCurrent, options }) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setCurrent(option);
    setShow(false);
  };

  return (
    <div className="relative w-full">
      <h2 className="text-[#070085] font-bold text-xl mb-2">{title}</h2>
      <div 
        className="py-3 px-4 rounded-xl border-2 border-[#00075D] flex justify-between items-center cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <span className="text-gray-700">{selected || `Select ${title}`}</span>
        {show ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {show && (
        <ul className="absolute z-10 w-full mt-1 bg-white border-2 border-slate-400 rounded-sm shadow-lg max-h-60 overflow-auto">
          {options && options.map((option, index) => (
            <li 
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}