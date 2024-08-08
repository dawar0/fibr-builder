import { auth } from "@/next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  if (session) return redirect("/dashboard");
  return redirect("/login");
}
