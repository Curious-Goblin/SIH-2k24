"use client";
import { useRouter } from "next/navigation";
import AchievmentSvg from "../svg/AchievmentsSvg";
import GameSvg from "../svg/GameSvg";
import NotificationSvg from "../svg/NotificationSvg";
import QuizSvg from "../svg/QuizSvg";

const SideBarData = [
    {
        name: "Game",
        icon: <GameSvg />,
        route: "/games",
    },
    {
        name: "Notification",
        icon: <NotificationSvg />,
        route: "/err",
    },
    {
        name: "Achievments",
        icon: <AchievmentSvg />,
        route: "/err",
    },
    {
        name: "Quiz History",
        icon: <QuizSvg />,
        route: "/err",
    },
];

export default function SideBar() {
    const router = useRouter();

    const handleNavigation = (route: string) => {
        router.push(route);
    };

    return (
        <div className="text-white p-3 pb-0 md:p-5 flex flex-col gap-3">
            {SideBarData.map((item, index) => (
                <div 
                    key={index} 
                    onClick={() => handleNavigation(item.route)}
                    className="flex items-center gap-3 md:gap-4 cursor-pointer text-[#696F79] font-medium hover:bg-[#cabfb9] p-2 md:p-3 rounded-lg"
                >
                    <div>{item.icon}</div>
                    <span className="hidden lg:block">{item.name}</span>
                </div>
            ))}
        </div>
    );
}
