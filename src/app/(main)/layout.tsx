import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth";
import HomeNavbar from "@/components/common/navbar/HomePageNavBar";
import AppSidebar from "@/components/common/app-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUser();
  if (session == null) {
    return <main>{children}</main>;
  } else {
    return (
      <>
        <HomeNavbar />

        <SidebarProvider>
          <AppSidebar />
          <main className="w-full h-full ">{children}</main>
        </SidebarProvider>
      </>
    );
  }
}
