"use client";
import { RenderChaiBlocks, RenderChaiPage } from "@chaibuilder/sdk/render";
import { ChaiBlock } from "@chaibuilder/sdk";
import { getStylesForBlocks } from "@chaibuilder/sdk/lib";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadWebBlocks } from "@chaibuilder/sdk/web-blocks";

loadWebBlocks();

export default function PreviewPage() {
  const [title, setTitle] = useState<string>("");
  const [styles, setStyles] = useState<any>();
  const [blocks, setBlocks] = useState<ChaiBlock[]>([]);
  const [builderAttributes, setBuilderAttributes] = useState<any>();
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
      .then(async (data) => {
        setTitle(data.title);
        setBlocks(data.builderJSON);
        setStyles(
          getStylesForBlocks(
            data.builderJSON,
            data.builderAttributesJSON,
            "",
            true
          )
        );
        setBuilderAttributes(data.builderAttributesJSON);
      });
  }, []);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return (
    <>
      <style>{styles}</style>
      <RenderChaiBlocks blocks={blocks} />
    </>
  );
}
