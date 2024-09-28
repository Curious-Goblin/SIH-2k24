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
    const { name } = session?.user;
    const nameparts = name.split(" ");
    const initials = getInitials(name);
    const backgroundColor = getRandomBrownColor();

    return (
        <div className="flex items-center">
            <div
                className="flex items-center justify-center rounded-lg w-48 h-48 text-white text-5xl font-bold"
                style={{ backgroundColor }}
            >
                {initials.toLocaleUpperCase()}
            </div>

            <div className="ml-10 flex-1">
                <div className="flex flex-col mb-7">
                    <div className="text-2xl text-[#654B3E] font-extrabold">
                        {nameparts[0]}
                    </div>
                    <div className="text-sm text-[#696F79] font-medium">Bonus booster 24lv</div>
                </div>
                <div className="max-w-96 bg-gray-300 rounded-full h-2.5 mb-10">
                    <div className="bg-[#654B3E] h-2.5 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <div className="flex space-x-8 text-[#696F79]">
                    <div className="flex gap-4">
                        <div className="rounded-md shadow-lg px-2 py-2">
                            <FlagSvg />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-2xl font-extrabold">27</div>
                            <div className="text-sm text-gray-500">Level Passed</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="rounded-md shadow-lg px-2 py-2">
                            <TimeSvg />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-2xl font-extrabold ">15min</div>
                            <div className="text-sm text-gray-500">Fastest Time</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="rounded-md shadow-lg px-2 py-2">
                            <TickSvg />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-2xl font-extrabold">140</div>
                            <div className="text-sm text-gray-500">Chapter's Completed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
