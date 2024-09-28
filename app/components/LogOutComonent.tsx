"use client"
import { signOut } from "next-auth/react";
import LogOutSvg from "../svg/LogOutSvg";

export default function LogoutButton() {
  return (
    <div
      className="flex items-center gap-5 px-8 cursor-pointer text-[#696F79] font-medium"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOutSvg />
      <button>Log Out</button>
    </div>
  );
}
