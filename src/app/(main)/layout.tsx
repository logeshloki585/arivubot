"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth";
import HomeNavbar from "@/components/common/navbar/HomePageNavBar";
import AppSidebar from "@/components/common/app-sidebar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full h-full">{children}</main>
    </>
  );
}
