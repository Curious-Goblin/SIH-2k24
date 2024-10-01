"use client";
import { useRouter } from "next/navigation";
import Button from "./button";
import { useState } from "react";

const UserDetails = ["sourabh", "aryan", "sanket", "pranav", "rohit", "nishikant"];

function getRandomLightColor() {
    const colors = [
        "#FDE68A", "#FCD34D", "#FCA5A5", "#F9A8D4", "#A5B4FC", "#6EE7B7", "#A7F3D0", "#D1FAE5", "#E5E7EB"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export default function OtherUsers() {
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();

    const handleNavigation = () => {
        router.push("/error");
    };

    const handleShowAll = () => {
        setShowAll(true);
    };

    return (
        <div>
            <div className="text-[#654B3E] text-lg font-bold mb-4">
                Other Users Online
            </div>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {/* Render first two users for small screens */}
                {UserDetails.slice(0, showAll ? UserDetails.length : 2).map((user, index) => (
                    <div
                        key={index}
                        onClick={handleNavigation}
                        className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full text-white text-lg font-semibold"
                        style={{ backgroundColor: getRandomLightColor() }}
                    >
                        {user[0].toUpperCase()}
                    </div>
                ))}
                {/* Show "+" for extra users on small screens */}
                {!showAll && (
                    <div
                        onClick={handleShowAll}
                        className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full bg-gray-300 text-lg font-semibold"
                    >
                        +{UserDetails.length - 2}
                    </div>
                )}
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={handleNavigation}
                    name="Combat"
                    style="border-2 border-red-900 inline-flex justify-center text-xl mt-7 py-1 px-1 md:px-2 lg:py-2 lg:px-4 xl:py-3 xl:px-8 font-medium text-[#654B3E] rounded-md"
                />
            </div>
        </div>
    );
}
