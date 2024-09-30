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
        route: "/games", // Add a route property for the Game button
    },
    {
        name: "Notification",
        icon: <NotificationSvg />,
        route: "/err", // Keep the existing route
    },
    {
        name: "Achievments",
        icon: <AchievmentSvg />,
        route: "/err", // Default route for other buttons
    },
    {
        name: "Quiz History",
        icon: <QuizSvg />,
        route: "/err", // Default route for other buttons
    },
];

export default function SideBar() {
    const router = useRouter(); 

    const handleNavigation = (route: string) => {
        router.push(route);  // Navigate to the provided route
    };

    return (
        <div className="text-white p-5 flex flex-col gap-5">
            {SideBarData.map((item, index) => (
                <div 
                    key={index} 
                    onClick={() => handleNavigation(item.route)}  // Pass the route from the item
                    className="flex items-center gap-4 cursor-pointer text-[#696F79] font-medium hover:bg-[#cabfb9] p-3 rounded-lg"
                >
                    <div>{item.icon}</div>
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    );
}
