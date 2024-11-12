import React from "react";
import HomeNavbar from "./navbar/HomePageNavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";

const SidebarContainer = () => {
  return (
    <>
      <HomeNavbar />
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </>
  );
};

export default SidebarContainer;
