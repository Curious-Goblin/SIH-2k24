"use client";
import Image from "next/image";
import DashboardSvg from "../svg/DashbordSvg";
import SideBar from "./SideBar";
import LogoutButton from "./LogOutComonent";
import { useRouter } from "next/navigation";

export default function LeftBar() {
    const router = useRouter();
    
    const handleNavigation = () => {
        router.push("/err");
    };
    const handleNavigationD = () => {
        router.push("/dashboard");
    };

    return (
        <div className="flex flex-col justify-between pb-4 md:w-[13.5%] w-full">
            <div>
                <div 
                    onClick={handleNavigationD} 
                    className="rounded-lg bg-[#654B3E] mx-4 text-white text-lg font-bold flex justify-around my-3 py-4 px-4 md:px-9 cursor-pointer"
                >
                    <DashboardSvg />
                    <button className="hidden lg:block">Dashboard</button>
                </div>
                <SideBar />
            </div>

            <div>
                <Image
                    src="/Support.png"
                    layout="responsive"
                    onClick={handleNavigation}
                    width={271}
                    height={300}
                    alt="Background"
                    className="object-cover cursor-pointer p-5"
                />
                <LogoutButton />
            </div>
        </div>
    );
}
