"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  const handleLogOut = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <Button variant="outline" type="submit" onClick={handleLogOut}>
      Log Out
    </Button>
  );
};
