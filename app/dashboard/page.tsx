import Button from "../components/button";
import Profile from "../components/Profile";
import SearchBarComponent from "../components/SearchBarComponent";
import SideBar from "../components/SideBar";
import LogoSvgDashboard from "../svg/logoSvgDashboard";

export default function Dashboard() {
    return (
        <div className="w-screen">
            <div className="flex items-center gap-6 w-full pl-6 pt-3">
                <div className="w-60 h-20">
                    <LogoSvgDashboard />
                </div>
                <SearchBarComponent />
                <Button style="rounded-lg bg-[#654B3E] text-white font-bold flex justify-center my-3 py-4 px-9"
                    name="Let's Learn" />
                <Profile />
            </div>
            <div style={{ width: '14%' }} className="pl-6">
                <Button name="Dashboard"
                    style="rounded-lg bg-[#654B3E] text-white font-bold flex justify-center my-3 py-4 px-9" />
                <SideBar />
            </div>
        </div>
    )
}