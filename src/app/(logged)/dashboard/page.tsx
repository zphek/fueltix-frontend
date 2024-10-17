"use client";

import { useUserStore } from "@/store/user";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  return (
    <main className="p-4 md:p-10 lg:px-20">
      <h1 className="text-5xl text-primary">Dashboard</h1>
      <div className="flex items-center gap-x-4 mt-4">
        <h2 className="text-[#00075D] text-xl font-bold">Fecha </h2>
      </div>

      <div className="flex items-center gap-x-4 mt-4">
        <input
          type="date"
          className="w-full outline-none rounded-full py-2 px-4 border-2 border-[#00075D]"
        />
        <button
          type="submit"
          className="py-2 px-6 rounded-full bg-[#00075D] text-white font-bold"
        >
          Search
        </button>
      </div>
    </main>
  );
}
