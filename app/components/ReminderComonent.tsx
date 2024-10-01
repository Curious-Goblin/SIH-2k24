"use client"
import { useRouter } from "next/navigation";
import Reminder1 from "../svg/ReminderSvg1"
import Reminder2 from "../svg/ReminderSvg2"
import Reminder3 from "../svg/ReminderSvg3"

const Reminders = [
    {
        svg: <Reminder1 />,
        name: "Article 420 left",
        subText: "Due Today"
    },
    {
        svg: <Reminder2 />,
        name: "Case Study 377",
        subText: "Due Next Week"
    },
    {
        svg: <Reminder3 />,
        name: "Basic Articles",
        subText: "Due May 15th"
    }
]


export default function ReminderComponent() {
    const router = useRouter();
    const handleNavigation = () => {
        router.push("/error")
    }
    return (
        <div className="mt-8">
            <div className="font-bold text-[#654B3E] text-md lg:text-lg xl:text-xl mb-5 lg:mb-7 xl:mb-10">
                Reminders
            </div>
            <div>
                {Reminders.map((reminder, index) => (
                    <div
                        key={index}
                        onClick={handleNavigation}
                        className="flex items-center cursor-pointer gap-2 lg:gap-5 pb-5">
                        <div className="w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12">{reminder.svg}</div>
                        <div>
                            <div className="text-sm sm:text-md">{reminder.name}</div>
                            <div className="text-[#B3B6B6] text-xs">{reminder.subText}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}