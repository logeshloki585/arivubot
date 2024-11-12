"use client";

import DummyComponent from "@/components/common/home";
import { getUser } from "@/lib/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    async function fx() {
      const session = await getUser();
      if (session) {
        router.push("/home");
      }
    }
    fx();
  });
  return <DummyComponent />;
}
