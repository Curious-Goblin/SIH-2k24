"use client";
import { signOut } from "next-auth/react";
import LogOutSvg from "../svg/LogOutSvg";

export default function LogoutButton() {
  return (
    <div
      className="flex items-center gap-3 md:gap-5 px-4 md:px-8 cursor-pointer text-[#696F79] font-medium"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOutSvg />
      <button className="hidden md:block">Log Out</button>
    </div>
  );
}
