import "../globals.css";

import { auth } from "@/next-auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) {
    return redirect("/dashboard");
  }
  return <div className="h-screen grid place-items-center">{children}</div>;
}
