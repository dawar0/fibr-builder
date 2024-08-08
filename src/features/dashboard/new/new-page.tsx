"use client";

import { Spinner } from "@/components/ui/spinner";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPage() {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch("/api/builder/page/new", {
      method: "POST",
    })
      .then((res) => {
        if (res.status !== 201) {
          setError(true);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);
  if (data?.page?.id) {
    redirect(`builder/${data?.page?.id}`);
  }

  return (
    <div className="my-auto h-screen grid place-items-center">
      <Spinner size={"medium"}></Spinner>
    </div>
  );
}
