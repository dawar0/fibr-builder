"use client";
import "@chaibuilder/sdk/styles";
import { ChaiBlock, ChaiBuilderEditor } from "@chaibuilder/sdk";
import { registerChaiBlock, useChaiBlocks } from "@chaibuilder/runtime";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { loadWebBlocks } from "@chaibuilder/sdk/web-blocks";
import { useRouter } from "next/navigation";

import { Logo } from "@/components/ui/logo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { redirect, useParams, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

loadWebBlocks();
export default function BuilderFullPage() {
  const [title, setTitle] = useState<string>("");
  const [blocks, setBlocks] = useState<ChaiBlock[]>([]);
  const [builderAttributes, setBuilderAttributes] = useState<any>({
    bodyBgDarkColor: "#0e0e0f",
    bodyBgLightColor: "#ffffff",
    bodyFont: "Inter",
    headingFont: "Inter",
    primaryColor: "#3b82f6",
    secondaryColor: "#bfdbfe",
  });

  const { id } = useParams();

  const router = useRouter();

  useEffect(() => {
    fetch(`/api/builder/page/${id}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 404) {
          router.push("/dashboard");
        }

        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setBlocks(data.builderJSON);
        setBuilderAttributes(data.builderAttributesJSON);
      });
  }, []);

  return (
    <Dialog>
      <DialogContent className="z-[101]">
        <DialogHeader>
          <DialogTitle>Page Title</DialogTitle>
          <Input
            className="w-full"
            placeholder="Enter a title for your page"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogHeader>
      </DialogContent>

      <ChaiBuilderEditor
        darkMode={true}
        brandingOptions={builderAttributes}
        blocks={blocks}
        onSave={async ({ blocks, brandingOptions }) => {
          setBlocks(blocks);
          const res = await fetch(`/api/builder/page/${id}`, {
            method: "POST",
            body: JSON.stringify({
              builderJSON: blocks,
              builderAttributesJSON: brandingOptions,
              title: title,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          return res.status === 200;
        }}
        topBarComponents={{
          left: [() => <TitleBlock title={title} />],
          right: [
            () => (
              <Button
                size={"sm"}
                variant={"outline"}
                className="text-md font-normal rounded-3xl"
                onClick={() => {
                  router.push(`/${id}`);
                }}
              >
                Preview
              </Button>
            ),
          ],
        }}
      />
    </Dialog>
  );
}

function TitleBlock({ title }: { title: string }) {
  const router = useRouter();
  const { id } = useParams();
  return (
    <div className="flex items-center">
      <Logo
        size={"sm"}
        onClick={() => {
          router.push("/dashboard");
        }}
      />
      <ChevronRight className="w-6 h-6" />
      <DialogTrigger>
        <h2 className="text-xl font-normal">{title}</h2>
      </DialogTrigger>
    </div>
  );
}
