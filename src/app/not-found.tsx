import { redirect } from "next/navigation";

const NotFound = () => redirect("/login");

export default NotFound;
