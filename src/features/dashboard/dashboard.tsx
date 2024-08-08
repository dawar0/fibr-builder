"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";
import { Spinner } from "@/components/ui/spinner";
import { Plus, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const session = useSession();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/builder/page/all", {
      method: "GET",
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        setPages(data.pages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <nav className="flex justify-between w-full">
        <Logo size="sm" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session.data?.user?.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="flex justify-between w-full">
        <h2 className="text-xl font-bold">Your Pages</h2>
        <Button variant="outline" onClick={() => router.push("/dashboard/new")}>
          <Plus className="w-4 h-4 mr-1" /> Landing page
        </Button>
      </div>

      {pages && pages?.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 w-full">
          {pages.map((page) => (
            <Card className="h-fit min-w-44" key={page.id}>
              <CardHeader className="pb-4">
                <CardDescription>Landing Page</CardDescription>
                <CardTitle className="text-2xl tabular-nums break-words">
                  {page.title || "Untitled Page"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/dashboard/builder/${page.id}`)}
                >
                  Edit
                </Button>
                <Button onClick={() => router.push(`/${page.id}`)}>View</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : loading ? (
        <div className="my-auto h-96 grid place-items-center">
          <Spinner size={"medium"}></Spinner>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-96">
          <div className="flex flex-col items-center">
            <p className="mt-2 text-sm font-normal text-center">
              We don&apos;t have any pages yet <br />
              Let&apos;s create one!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
