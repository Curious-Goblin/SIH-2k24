import Profile from "../components/Profile";
import SearchBarComponent from "../components/SearchBarComponent";
import SideBar from "../components/SideBar";
import LogoSvgDashboard from "../svg/logoSvgDashboard";
import Button from "../components/button";
import DashboardSvg from "../svg/DashbordSvg";
import LogoutButton from "../components/LogOutComonent";
import Image from "next/image";
import ProfileMain from "../components/ProfileMain";
import GamesComponent from "../components/GamesComponent";
import RightBar from "../components/RightBar";

export default function Dashboard() {
    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="flex items-center gap-6 w-full pl-6 pt-3">
                <div className="w-60 h-20">
                    <LogoSvgDashboard />
                </div>
                <SearchBarComponent />
                <Button
                    style="rounded-lg bg-[#654B3E] text-white font-bold flex justify-center my-3 py-4 px-10"
                    name="Let's Learn"
                />
                <Profile />
            </div>

            <div className="flex-grow pl-6 pt-4 flex gap-8">
                <div className="flex flex-col justify-between pb-20" style={{ width: '12%' }}>
                    <div>
                        <div className="rounded-lg bg-[#654B3E] text-white text-lg font-bold flex justify-around my-3 py-4 px-9">
                            <DashboardSvg />
                            <button>Dashboard</button>
                        </div>
                        <SideBar />
                    </div>
                    <div>
                        <Image
                            src="/Support.png"
                            layout="responsive" 
                            width={271}
                            height={300}
                            alt="Background"
                            className="object-cover pb-10 cursor-pointer"
                        />
                        <LogoutButton />
                    </div>
                </div>
                <div className="rounded-lg h-full shadow-xl p-10" style={{ width: '68%' }}>
                    <ProfileMain/>
                    <div className="flex justify-between text-xl mt-8 mb-5 font-extrabold text-[#654B3E]">
                        <div>Let's Play</div>
                        <div>View all</div>
                    </div>
                    <GamesComponent/>
                </div>
                <div>
                    <RightBar/>
                </div>
            </div>
        </div>
    );
}
