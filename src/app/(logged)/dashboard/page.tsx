"use client";

import { useUserStore } from "@/store/user";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return <main></main>;
}
