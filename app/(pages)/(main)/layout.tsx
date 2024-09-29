import LogoSvgDashboard from "@/app/svg/logoSvgDashboard";
import SearchBarComponent from "@/app/components/SearchBarComponent";
import Button from "@/app/components/button";
import Profile from "@/app/components/Profile";
import LeftBar from "@/app/components/LeftBar";
import RightBar from "@/app/components/RightBar";

export default function Layout({ children }: { children: React.ReactNode }) {
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
                <LeftBar />
                <div className="flex-grow rounded-lg shadow-xl p-10" style={{ width: '68%' }}>
                    {children}
                </div>
                <RightBar />
            </div>
        </div>
    );
}
