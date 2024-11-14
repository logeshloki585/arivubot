"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsChatDots } from "react-icons/bs";
import { PiChatsCircleFill } from "react-icons/pi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { useParams } from "next/navigation";

interface Menu {
  title: string;
  path: string;
  icon: React.ReactNode;
  gap?: boolean;
}

interface NewSideBarProps {
  children: React.ReactNode;
}

const NewSideBar: React.FC<NewSideBarProps> = (props) => {
  const [open, setOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  const Menus: Menu[] = [
    { title: "Play Area", path: "/home/playground", icon: <BsChatDots /> },
    { title: "Activity", path: "/home/playground", icon: <PiChatsCircleFill /> },
    { title: "Leads", path: "/home/playground", icon: <FaArrowTrendUp /> },
    { title: "Connect", path: "/home/playground", icon: <PiPlugsConnectedFill />, gap: true },
    { title: "Integration", path: "/home/playground", icon: <GiSettingsKnobs /> },
    { title: "Settings", path: "/home/settings", icon: <IoMdSettings />, gap: true },
  ];


  return (
    <div className="flex z-50">
      <div className={`${open ? "w-72" : "w-20"} h-screen p-5 pt-8 relative duration-300`}>
        <img
          src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/refs/heads/main/src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-24 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/refs/heads/main/src/assets/logo.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 ${menu.gap ? "border-t pt-6 mt-6" : "mt-2"}`}
            >
              <Link
                href={`${menu.path}/${slug}`}
                className={`flex items-center gap-x-4 w-full p-2 rounded-md duration-200 text-black`}
              >
                <span className="text-xl">{menu.icon}</span>
                <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 bg-gray-300 border-l">{props.children}</div>
    </div>
  );
};

export default NewSideBar;
