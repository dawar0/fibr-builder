import "../globals.css";

import { auth } from "@/next-auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return <>{children}</>;
}
