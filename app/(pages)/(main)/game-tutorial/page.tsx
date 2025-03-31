"use client"
import { GameNameAtom } from "@/app/atoms/gamedetails";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import Button from "@/app/components/button";
import GameDetails from "@/app/components/GameDetails";
import LikeSvg from "@/app/svg/LikeSvg";

const GamesDetails = [
    {
        image: "gameimg1.avif",
        gameName: "The Hangman",
        title: "Master the Constitution Hangman Game",
        description: "In 'The Constitutional Hangman,' players will be tested on their knowledge of the Constitution by guessing key terms related to constitutional law and governance. As the game progresses, each incorrect guess brings you closer to losing the game, while each correct guess uncovers crucial terms that are fundamental to understanding the Constitution. This interactive hangman game is a fun way to sharpen your knowledge while testing how well you remember important legal terms and concepts.",
        likes: "15k",
        bgColor: "#942539",
        passingPoints: 50,
        attempts: 5,
        timeLimit: "10 mins"
    },
    {
        image: "gameimg2.avif",
        gameName: "Cards of Knowledge",
        title: "Learn Laws with Cards of Knowledge",
        description: "In 'Cards of Knowledge,' the challenge lies in picking the correct cards that represent key aspects of Indian laws, acts, and amendments. As you progress, you'll be presented with cards that test your understanding of legal provisions, historical amendments, and landmark acts that shaped the nation's legislative framework. This card-based learning game is an engaging way to deepen your understanding of India's legal system, encouraging you to choose wisely as you learn more with every card.",
        likes: "11k",
        bgColor: "#3C1186",
        passingPoints: 60,
        attempts: 3,
        timeLimit: "15 mins"
    },
    {
        image: "gameimg3.avif",
        gameName: "The Monopoly",
        title: "Play Monopoly with Science, Moral Science and Global History",
        description: "In 'The Monopoly,' players traverse the board while learning about various things. Each move presents you with a new challenge or opportunity to learn about fundamental things of the subjects. As you navigate through the game, you'll not only build your knowledge of but also make strategic decisions that impact your progress. This Monopoly-style game offers a dynamic and engaging way to explore the different fields in a fun, board game format.",
        likes: "17k",
        bgColor: "#5B2932",
        passingPoints: 70,
        attempts: 4,
        timeLimit: "20 mins"
    }
];


function getCurrentDateFormatted() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export default function Game() {
    const [gameName, setGameName] = useRecoilState(GameNameAtom);
    const currentDate = getCurrentDateFormatted();
    useEffect(() => {
        const storedGameName = localStorage.getItem('gameName');
        if (storedGameName) {
            setGameName(storedGameName);
        }
    }, [setGameName]);

    const gameDetails = GamesDetails.find((game) => game.gameName === gameName);

    return (
        <div>
            <div className="font-bold text-xl text-[#654B3E]">
                Game Tutorial
            </div>

            {gameDetails ? (
                <div className="mt-4">
                    <div className="flex gap-8">
                        <div style={{ width: '700px' }}> {/* Ensure the width is fixed */}
                            <Image
                                src={`/${gameDetails.image}`}
                                width={700}
                                height={420}
                                alt="Background"
                                className="object-cover cursor-pointer rounded-xl"
                            />
                            <div className="pt-6">
                                <div className="flex justify-between">
                                    <div className="font-medium text-xl">
                                        {gameDetails.title}
                                    </div>
                                    <div className="flex text-[#FB6D3A] text-sm gap-1">
                                        <div><LikeSvg /></div>
                                        <div>{gameDetails.likes}</div>
                                    </div>
                                </div>
                                <div className="pt-10 text-md">
                                    {gameDetails.description}
                                </div>
                            </div>
                        </div>
                        <div>
                            <GameDetails />
                        </div>
                    </div>

                </div>
            ) : (
                <div className="mt-4 text-red-500 font-semibold">
                    No game found. Please select a valid game.
                </div>
            )}
        </div>
    );
}
