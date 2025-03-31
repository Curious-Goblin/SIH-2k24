"use client";

import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeartSvg from "../svg/HeartSvg";
import LockSvg from "../svg/LockSvg";
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
        gameName: "The Hangman",
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
        gameName: "The Monopoly",
        likes: "17K",
        bgColor: "#5B2932",
    },
    // {
    //     image: "gameimg2.avif",
    //     gameName: "Cards of Knowledge",
    //     likes: "11K",
    //     bgColor: "#3C1186",
    // },
    // {
    //     image: "gameimg3.avif",
    //     gameName: "The Constitutional Monopoly",
    //     likes: "17K",
    //     bgColor: "#5B2932",
    // },
    // {
    //     image: "gameimg2.avif",
    //     gameName: "Cards of Knowledge",
    //     likes: "11K",
    //     bgColor: "#3C1186",
    // },
    // {
    //     image: "gameimg3.avif",
    //     gameName: "The Constitutional Monopoly",
    //     likes: "17K",
    //     bgColor: "#5B2932",
    // },
    // {
    //     image: "gameimg2.avif",
    //     gameName: "Cards of Knowledge",
    //     likes: "11K",
    //     bgColor: "#3C1186",
    // },
    // {
    //     image: "gameimg3.avif",
    //     gameName: "The Constitutional Monopoly",
    //     likes: "17K",
    //     bgColor: "#5B2932",
    // }
];

function shuffleArray(array: { image: string; gameName: string; likes: string; bgColor: string }[]) {
    const nonHangmanGames = array.filter(game => game.gameName !== "The Hangman");
    const shuffledNonHangmanGames = nonHangmanGames.sort(() => Math.random() - 0.5);
    return [
        array.find(game => game.gameName === "The Hangman")!,
        ...shuffledNonHangmanGames
    ];
}

export default function GamesComponent2() {
    const [shuffledGames, setShuffledGames] = useState(GamesDetails);
    const [gameName, setGameName] = useRecoilState(GameNameAtom);
    const router = useRouter();

    useEffect(() => {
        setShuffledGames(shuffleArray(GamesDetails));
        if (gameName) {
            localStorage.setItem("gameName", gameName);
        }
    }, [gameName]);

    const handleCardClick = (name: string) => {
        setGameName(name);
        router.push("/game-tutorial");
    };

    return (
        <div className="max-h-[85vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shuffledGames.map((item, index) => (
                    <div
                        key={index}
                        className={`relative h-80 w-full rounded-lg shadow-lg overflow-hidden ${
                            item.gameName !== "The Hangman" ? "cursor-default" : "cursor-pointer"
                        }`}
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        onClick={() => item.gameName === "The Hangman" && handleCardClick(item.gameName)}
                    >
                        {item.gameName !== "The Hangman" && (
                            <div className="absolute inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                                <LockSvg />
                            </div>
                        )}
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
