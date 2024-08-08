import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="my-auto h-96 grid place-items-center">
      <Spinner size={"medium"}></Spinner>
    </div>
  );
}
