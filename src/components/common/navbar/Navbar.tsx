"use client";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-between p-4 bg-white px-10">
      <div className="flex items-center gap-2">
        <div className="font-semibold text-xl">
          <svg
            width="31"
            height="25"
            viewBox="0 0 31 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.7537 17.3618L27.2417 13.3418C27.2417 13.3418 27.2327 13.3248 27.2267 13.3178L27.0287 13.0018C26.8466 12.7081 26.5924 12.4657 26.2904 12.2977C25.9883 12.1297 25.6484 12.0416 25.3027 12.0418L21.2567 12.0278L20.9747 12.4808L16.1397 20.2168L15.8727 20.6448L17.8997 23.8798C18.2737 24.4818 18.9197 24.8408 19.6317 24.8408H25.3017C26.0007 24.8408 26.6617 24.4728 27.0317 23.8818L27.2317 23.5618C27.2317 23.5618 27.2397 23.5538 27.2417 23.5498L29.7567 19.5248C29.9591 19.2002 30.0664 18.8253 30.0664 18.4428C30.0664 18.0603 29.9591 17.6854 29.7567 17.3608H29.7547L29.7537 17.3618ZM28.9877 19.0448L26.4717 23.0698C26.4617 23.0898 26.4477 23.1038 26.4367 23.1198C26.4013 23.1594 26.3572 23.1901 26.3077 23.2096C26.2583 23.229 26.205 23.2366 26.1522 23.2318C26.0993 23.2269 26.0483 23.2097 26.0032 23.1816C25.9582 23.1535 25.9203 23.1152 25.8927 23.0698L23.3777 19.0428C23.3208 18.9528 23.277 18.8552 23.2477 18.7528C23.2041 18.601 23.1929 18.4417 23.2147 18.2853C23.2366 18.1289 23.2911 17.9788 23.3747 17.8448L25.8867 13.8248L25.8927 13.8148C25.9527 13.7248 26.0277 13.6838 26.0927 13.6708C26.1187 13.6628 26.1417 13.6608 26.1597 13.6578H26.1877C26.2457 13.6578 26.3897 13.6758 26.4797 13.8218L28.9907 17.8418C29.2207 18.2078 29.2207 18.6788 28.9907 19.0448H28.9877ZM22.3217 7.6358C22.5232 7.31087 22.63 6.93613 22.63 6.5538C22.63 6.17146 22.5232 5.79672 22.3217 5.4718L19.8097 1.4518L19.5997 1.1138C19.4168 0.819466 19.1617 0.576829 18.8585 0.40897C18.5553 0.24111 18.2143 0.153611 17.8677 0.154797H12.1977C11.4907 0.154797 10.8437 0.514797 10.4667 1.1148L0.31374 17.3658C0.10975 17.6894 0.00133128 18.064 0.000977431 18.4465C0.000623584 18.829 0.108349 19.2038 0.31174 19.5278L3.03474 23.8868C3.21711 24.1812 3.47189 24.4239 3.77475 24.5918C4.07762 24.7597 4.41846 24.8471 4.76474 24.8458H10.4347C11.1467 24.8458 11.7927 24.4858 12.1667 23.8858L12.3747 23.5558V23.5518L12.3777 23.5448L14.4017 20.3078L20.4007 10.7078L22.3177 7.6378L22.3217 7.6368V7.6358ZM21.7287 6.5538C21.7287 6.7608 21.6707 6.9698 21.5537 7.1548L11.6077 23.0728C11.577 23.1221 11.534 23.1627 11.4831 23.1907C11.4322 23.2188 11.3749 23.2332 11.3167 23.2328C11.2585 23.2332 11.2011 23.2187 11.15 23.1907C11.0989 23.1627 11.0557 23.1221 11.0247 23.0728L8.51174 19.0458C8.39989 18.8653 8.34063 18.6571 8.34063 18.4448C8.34063 18.2324 8.39989 18.0243 8.51174 17.8438L18.4567 1.9308C18.4872 1.8807 18.5301 1.83935 18.5812 1.81079C18.6324 1.78222 18.6901 1.76741 18.7487 1.7678C18.8067 1.7678 18.9507 1.7848 19.0417 1.9318L21.5537 5.9518C21.6707 6.1368 21.7287 6.3458 21.7287 6.5538Z"
              fill="#1171BA"
            />
          </svg>
        </div>
      </div>
      <div className="ml-[200px] lg:flex items-center gap-8">
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
            className="bg-[#1171BA] text-white hover:bg-[#0E5FA0]"
          >
            Start up
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
