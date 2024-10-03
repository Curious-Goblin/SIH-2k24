import LogoSvgDashboard from "../svg/logoSvgDashboard";
import Button from "./button";
import Profile from "./Profile";
import SearchBarComponent from "./SearchBarComponent";

export default function Appbar() {
    return (
        <div className="flex flex-wrap md:flex-nowrap items-center gap-6 w-full p-4 pb-0 pt-0">
            <div className="w-40 h-16 md:w-60 md:h-20">
                <LogoSvgDashboard />
            </div>
            <div className="flex-grow shadow-md rounded-lg w-full md:w-auto">
                <SearchBarComponent />
            </div>

            <div className="hidden md:flex">
                <Button
                    style="rounded-lg bg-[#654B3E] text-white font-bold justify-center py-3 px-6 md:py-4 md:px-10"
                    name="Let's Learn"
                />
            </div>

            <Profile />
        </div>
    );
}
