"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <Logo size={"sm"} />
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Let's start by logging in with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button
              className="w-full"
              onClick={() => {
                signIn("google");
              }}
            >
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            This is a demo application for Fibr.ai
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
