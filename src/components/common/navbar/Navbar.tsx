"use client";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <nav className="flex items-center justify-between p-4 bg-white px-10">
      <div className="flex items-center gap-2">
        <div className="font-semibold text-xl">✷ ChatBot AI</div>
      </div>
      <div className="ml-20 lg:flex items-center gap-8">
        <Button variant="link">Product</Button>
        <Button variant="link">Customers</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" className="flex items-center gap-1">
              Resources <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Blog</DropdownMenuItem>
            <DropdownMenuItem>Case Studies</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="link">Pricing</Button>
      </div>
      <div className="hidden lg:flex items-center gap-6">
        <Button
          variant="outline"
          onClick={() => {
            if (session == null) {
              router.push("/login");
            } else {
              signOut({ callbackUrl: "/" });
            }
          }}
        >
          {session != null ? "Log Out" : "Log in"}
        </Button>
        {session == null && (
          <Button
            onClick={() => {
              router.push("/signup");
            }}
            className="bg-[#C1F664] text-black hover:bg-[#b1e654]"
          >
            Get started
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
