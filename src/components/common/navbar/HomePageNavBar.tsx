import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

const HomeNavbar = async () => {
  const res = await getUser();

  return (
    <div className="fixed w-full top-0 left-0 border-2">
      <nav className=" flex items-center justify-between p-4 bg-white px-10">
        <div className="flex items-center gap-2">
          {/* <div className="font-semibold text-xl">✷ ChatBot AI</div> */}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {res != null ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HomeNavbar;
