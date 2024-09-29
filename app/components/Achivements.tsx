"use client"
import { useRouter } from "next/navigation";
import Comeback from "../svg/ComebackSvg"
import Lucky from "../svg/LuckySvg"
import Winner from "../svg/WinnerSvg"

const Achievments = [
    {
        svg: <Comeback />,
        name: "Comeback"
    },
    {
        svg: <Winner />,
        name: "Winner"
    },
    {
        svg: <Lucky />,
        name: "Lucky"
    }
]

export default function AchievmentComponent() {
    const router = useRouter();
    const handleNavigation = () => {
        router.push("/error")
    }
    return (
        <div className="mt-8">
            <div className="flex justify-between items-center">
                <div className="font-bold text-[#654B3E] text-xl ">
                    Achievments
                </div>
                <div onClick={handleNavigation} className="font-light cursor-pointer text-[#654B3E]">
                    View all
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
                {Achievments.map((achievment, index) => (
                    <div
                        key={index}
                        onClick={handleNavigation}
                        className="flex flex-col cursor-pointer gap-6 pt-8"
                    >
                        <div className="w-20 h-20">
                            {achievment.svg}
                        </div>
                        <div className="flex justify-center font-light text-[#696F79]">
                            {achievment.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}