"use client";

import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeartSvg from "../svg/HeartSvg";
import { GameNameAtom } from "../atoms/gamedetails";

function hexToRgba(hex: string, opacity: number) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const GamesDetails = [
    {
        image: "gameimg1.avif",
        gameName: "The Constitutional Hangman",
        likes: "15K",
        bgColor: "#942539",
    },
    {
        image: "gameimg2.avif",
        gameName: "Cards of Knowledge",
        likes: "11K",
        bgColor: "#3C1186",
    },
    {
        image: "gameimg3.avif",
        gameName: "The Constitutional Monopoly",
        likes: "17K",
        bgColor: "#5B2932",
    },
];

function createMultipleRows(
    array: { image: string; gameName: string; likes: string; bgColor: string }[],
    repeatCount: number
) {
    let extendedArray: {
        image: string;
        gameName: string;
        likes: string;
        bgColor: string;
    }[] = [];
    for (let i = 0; i < repeatCount; i++) {
        extendedArray = extendedArray.concat(array);
    }
    return extendedArray;
}

function shuffleArray(
    array: { image: string; gameName: string; likes: string; bgColor: string }[]
) {
    return array.sort(() => Math.random() - 0.5);
}

export default function GamesComponent() {
    const extendedGames = createMultipleRows(GamesDetails, 3);
    const [shuffledGames, setShuffledGames] = useState(extendedGames);
    const [gameName, setGameName] = useRecoilState(GameNameAtom);
    const router = useRouter();

    useEffect(() => {
        setShuffledGames(shuffleArray([...extendedGames]));
        if (gameName) {
            localStorage.setItem('gameName', gameName);
        }
    }, [, gameName]);

    const handleCardClick = (name: string) => {
        setGameName(name);
        router.push("/game-tutorial");
    };

    return (
        <div className="max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shuffledGames.map((item, index) => (
                    <div
                        key={index}
                        className="relative h-80 w-full rounded-lg shadow-lg overflow-hidden cursor-pointer"
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        onClick={() => handleCardClick(item.gameName)}
                    >
                        <div className="absolute top-3 left-3 flex items-center bg-white text-[#654B3E] text-sm font-bold px-2 py-1 rounded-md">
                            <span>{item.likes}</span>
                            <div className="flex items-center justify-center mt-2 w-5 h-5">
                                <HeartSvg />
                            </div>
                        </div>
                        <div
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-9/12 text-white text-sm font-semibold px-4 py-5 rounded-md text-center"
                            style={{
                                backgroundColor: hexToRgba(item.bgColor, 0.8),
                            }}
                        >
                            {item.gameName}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
