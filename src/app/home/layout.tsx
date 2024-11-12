import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/app-sidebar";
import { getUser } from "@/lib/auth";
import HomeNavbar from "@/components/common/navbar/HomePageNavBar";
import LoginPage from "@/components/common/login";
import SidebarContainer from "@/components/common/SidebarContainer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getUser();

  if (!session) {
    return <main>{children}</main>;
  } else {
    return (
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <AppSidebar />
          {/* <SidebarContainer /> */}
          <HomeNavbar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
