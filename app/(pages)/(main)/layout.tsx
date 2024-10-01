// import LogoSvgDashboard from "@/app/svg/logoSvgDashboard";
// import SearchBarComponent from "@/app/components/SearchBarComponent";
// import Button from "@/app/components/button";
// import Profile from "@/app/components/Profile";
import LeftBar from "@/app/components/LeftBar";
import RightBar from "@/app/components/RightBar";
import Appbar from "@/app/components/Appbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen h-screen flex flex-col">
            <Appbar />
            <div className="pl-3 pt-2 flex gap-4 overflow-hidden">
                <LeftBar />
                <div className="flex-grow rounded-lg shadow-xl p-10" style={{ width: '68%' }}>
                    {children}
                </div>
                <RightBar />
            </div>
        </div>
    );
}
