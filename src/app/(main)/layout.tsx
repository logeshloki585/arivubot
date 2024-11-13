"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth";
import HomeNavbar from "@/components/common/navbar/HomePageNavBar";
import AppSidebar from "@/components/common/app-sidebar";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getUser();
  const pathname = usePathname();

  if (session == null) {
    return <main>{children}</main>;
  }

  if (pathname === "/") {
    return (
      <>
        <main className="w-full h-full">{children}</main>
      </>
    );
  }

  return (
    <>
      <HomeNavbar />
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-full">{children}</main>
      </SidebarProvider>
    </>
  );
}
