import AchievmentSvg from "../svg/AchievmentsSvg";
import GameSvg from "../svg/GameSvg";
import NotificationSvg from "../svg/NotificationSvg";
import QuizSvg from "../svg/QuizSvg";

const SideBarData = [
    {
        name: "Game",
        icon: <GameSvg />,
    },
    {
        name: "Notification",
        icon: <NotificationSvg />,
    },
    {
        name: "Achievments",
        icon: <AchievmentSvg />,
    },
    {
        name: "Quiz History",
        icon: <QuizSvg />,
    },
];

export default function SideBar() {
    return (
        <div className="text-white p-5 flex flex-col gap-5">
            {SideBarData.map((item, index) => (
                <div key={index} className="flex items-center gap-4 cursor-pointer text-[#696F79] font-medium hover:bg-[#cabfb9] p-3 rounded-lg">
                    <div>{item.icon}</div>
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    );
}
