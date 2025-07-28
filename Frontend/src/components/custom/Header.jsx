import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";

import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="w-full h-16 flex items-center justify-between px-6 border-b bg-white shadow-md">
      <Link to={"/"}>
        <img src="/logo.svg" className="h-10 w-auto" />
      </Link>

      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button className="bg-blue-500 text-white">Dashboard</Button>
          </Link>

          <UserButton></UserButton>
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button className="bg-blue-500 text-white">Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
