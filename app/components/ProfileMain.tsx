import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import FlagSvg from "../svg/FlagSvg";
import TimeSvg from "../svg/TimeSvg";
import TickSvg from "../svg/TickSvg";

function getInitials(name: string) {
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
        return nameParts[0][0] + nameParts[1][0];
    }
    return name[0];
}

function getRandomBrownColor() {
    const r = Math.floor(Math.random() * (200 - 130) + 130);
    const g = Math.floor(Math.random() * (110 - 70) + 70);
    const b = Math.floor(Math.random() * (50 - 30) + 30);
    return `rgb(${r}, ${g}, ${b})`;
}

export default async function ProfileMain() {
    const session = await getServerSession(authOptions);
    const { name } = session?.user || { name: "Dummy User" };
    const nameparts = name.split(" ");
    const initials = getInitials(name);
    const backgroundColor = getRandomBrownColor();

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10">
            <div
                className="flex items-center justify-center rounded-lg w-36 h-36 sm:w-48 sm:h-48 text-white text-4xl sm:text-5xl font-bold mb-6 md:mb-0"
                style={{ backgroundColor }}
            >
                {initials.toUpperCase()}
            </div>
            <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col mb-6">
                    <div className="text-xl sm:text-2xl text-[#654B3E] font-extrabold">
                        {nameparts[0]}
                    </div>
                    <div className="text-sm text-[#696F79] font-medium">Bonus booster 24lv</div>
                </div>
                <div className="max-w-full sm:max-w-96 bg-gray-300 rounded-full h-2.5 mb-6">
                    <div className="bg-[#654B3E] h-2.5 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#696F79]">
                    <div className="flex items-center gap-4">
                        <div className="rounded-md shadow-lg p-2">
                            <FlagSvg />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-xl sm:text-2xl font-extrabold">27</div>
                            <div className="text-sm text-gray-500">Level Passed</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="rounded-md shadow-lg p-2">
                            <TimeSvg />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-xl sm:text-2xl font-extrabold">15min</div>
                            <div className="text-sm text-gray-500">Fastest Time</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="rounded-md shadow-lg p-2">
                            <TickSvg />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-xl sm:text-2xl font-extrabold">140</div>
                            <div className="text-sm text-gray-500">Chapters Completed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
