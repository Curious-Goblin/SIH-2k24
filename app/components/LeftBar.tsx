"use client"
import Image from "next/image";
import DashboardSvg from "../svg/DashbordSvg";
import SideBar from "./SideBar";
import LogoutButton from "./LogOutComonent";
import { useRouter } from "next/navigation";

export default function LeftBar(){
    const router = useRouter(); 
    const handleNavigation = () => {
        router.push("/err");  
    };
    const handleNavigationD = () => {
        router.push("/dashboard");  
    };
    return (
        <div className="flex flex-col justify-between pb-20" style={{ width: '12%' }}>
        <div>
          <div onClick={handleNavigationD} className="rounded-lg bg-[#654B3E] text-white text-lg font-bold flex justify-around my-3 py-4 px-9">
            <DashboardSvg />
            <button>Dashboard</button>
          </div>
          <SideBar />
        </div>
        <div className="pb-10">
          <Image
            src="/Support.png"
            layout="responsive"
            onClick={handleNavigation}
            width={271}
            height={300}
            alt="Background"
            className="object-cover pb-10 cursor-pointer"
          />
          <LogoutButton />
        </div>
      </div>
    )
}