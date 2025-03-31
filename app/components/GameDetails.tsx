import { useRecoilState } from "recoil";
import { GameNameAtom } from "../atoms/gamedetails";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./button";

const GamesDetails = [
    {
        image: "gameimg1.avif",
        gameName: "The Hangman",
        title: "Master the Indian Constitution Hangman Game",
        description: "Test your knowledge of the Indian Constitution by guessing terms in this fun and interactive hangman game.",
        likes: "15K",
        bgColor: "#942539",
        passingPoints: 50,
        attempts: 5,
        timeLimit: "10 mins"
    },
    {
        image: "gameimg2.avif",
        gameName: "Cards of Knowledge",
        title: "Learn Indian Laws with Cards of Knowledge",
        description: "Pick the right cards and learn more about Indian laws, acts, and amendments in this challenging card game.",
        likes: "11K",
        bgColor: "#3C1186",
        passingPoints: 60,
        attempts: 3,
        timeLimit: "15 mins"
    },
    {
        image: "gameimg3.avif",
        gameName: "The Monopoly",
        title: "Play Monopoly with Indian Constitutional Amendments",
        description: "Explore Indian constitutional amendments as you navigate through the board in this engaging Monopoly-style game.",
        likes: "17K",
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

export default function GameDetails() {
    const [gameName, setGameName] = useRecoilState(GameNameAtom);
    const currentDate = getCurrentDateFormatted();
    const router = useRouter();

    useEffect(() => {
        const storedGameName = localStorage.getItem('gameName');
        if (storedGameName) {
            setGameName(storedGameName);
        }
    }, [setGameName]);

    const gameDetails = GamesDetails.find((game) => game.gameName === gameName);

    const handleStartGameClick = () => {
        if (gameName === "The Hangman") {
            router.push("/hangmanGame");
        }
        else if(gameName === "The Monopoly"){
            router.push("https://anujbag012.github.io/MONOPOLY/")
        }
    };

    return (
        <div className="flex flex-col gap-10 mt-10 ml-5">
            <div className="flex gap-10 text-[#696F79] text-lg">
                <div className="flex flex-col gap-6 font-extrabold">
                    <div className="font-semibold">Date:</div>
                    <div className="font-semibold">Time Limit:</div>
                    <div className="font-semibold">Attempts:</div>
                    <div className="font-semibold">Pass Points:</div>
                </div>
                <div className="flex flex-col gap-6 font-normal">
                    <div>{currentDate}</div>
                    <div>{gameDetails?.timeLimit}</div>
                    <div>{gameDetails?.attempts}</div>
                    <div>{gameDetails?.passingPoints} Points</div>
                </div>
            </div>
            <div className="max-w-fit">
                <div>
                    <Button
                        onClick={(gameName === "The Hangman" || gameName === "The Monopoly") ? handleStartGameClick : undefined}
                        style="font-extrabold cursor-pointer bg-[#654B3E] px-12 py-4 rounded-md text-white"
                        name="Start Game"
                    />
                </div>
            </div>
        </div>
    );
}
