"use client";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import data from "../utils/data.json";
import { Keyboard } from "./Keyboard";
import { HangmanQuestion } from "./HangmanQuestion";
import { HangmanDrawing } from "./HangmanDrawing";
import { guessedOptionsState } from "../atoms/gussedOptions";

interface Props {
  guessedOptions: string[];
  answers: string[];
  setIsWinner: (isWinner: boolean) => void;
  incorrectGuesses: number;
  setIncorrectGuesses: (incorrectGuesses: number) => void;
}

function getQuestionDetails() {
  const questionData = data[Math.floor(Math.random() * data.length)];

  if (questionData) {
    return {
      question: questionData.question,
      answers: questionData.answers,
      options: questionData.options,
    };
  } else {
    return { question: "Question not found.", answers: [], options: [] };
  }
}

const SubmitAnswer: React.FC<Props> = ({
  guessedOptions,
  answers,
  setIsWinner,
  incorrectGuesses,
  setIncorrectGuesses,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const sortedAnswers = answers
      .map((answer) => answer.toLowerCase())
      .slice()
      .sort();
    const sortedGuessedOptions = guessedOptions
      .map((option) => option.toLowerCase())
      .slice()
      .sort();

    const areEqual =
      sortedAnswers.length === sortedGuessedOptions.length &&
      sortedAnswers.every((value, index) => value === sortedGuessedOptions[index]);

    setIsWinner(areEqual);
    if (!areEqual) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
    console.log("Are Equal:", areEqual);
  };

  return (
    <button
      className="border-2 h-14 w-5/12 p-4 bg-blue-500 text-white font-bold font-mono rounded-lg"
      onClick={handleClick}
    >
      CHECK
    </button>
  );
};

function HangmanGame() {
  const [questionDetails, setQuestionDetails] = useState<{
    question: string;
    answers: string[];
    options: string[];
  }>({
    question: "",
    answers: [],
    options: [],
  });
  
  const [questionToGuess, setQuestionToGuess] = useState<string>("");
  const [guessedOptions, setGuessedOptions] = useRecoilState(guessedOptionsState);
  const [Options, setOptions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [isLoser, setIsLoser] = useState<boolean>(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const router = useRouter();

  const addGuessedOption = useCallback(
    (option: string) => {
      if (guessedOptions.length < 2 && !guessedOptions.includes(option)) {
        setGuessedOptions((current) => [...current, option]);
      }
    },
    [guessedOptions]
  );

  useEffect(() => {
    // Fetch or generate question details on the client side
    setQuestionDetails(getQuestionDetails());
  }, []);

  useEffect(() => {
    // Set the question and its options when the questionDetails state updates
    setQuestionToGuess(questionDetails.question);
    setOptions(questionDetails.options);
    setAnswers(questionDetails.answers);
  }, [questionDetails]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      resetGame();
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  const resetGame = () => {
    setGuessedOptions([]);
    setIncorrectGuesses(0);
    setQuestionDetails(getQuestionDetails());
    setIsWinner(false);
    setIsLoser(false);
  };

  useEffect(() => {
    if (incorrectGuesses >= 6) {
      setIsLoser(true);
    }
  }, [incorrectGuesses]);

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex">
      <div className=" max-w-3xl h-screen flex flex-col gap-8 mx-auto items-center relative">
        <div className="text-2xl text-center">
          {isWinner && "Winner! - Refresh to try again"}
          {isLoser && "Nice Try - Refresh to try again"}
        </div>
        <HangmanQuestion questionToGuess={questionToGuess} />
        <div className="w-full">
          <Keyboard
            guessedOptions={guessedOptions}
            options={Options}
            disabled={isWinner || isLoser}
            activeLetters={guessedOptions.filter((letter) =>
              questionToGuess.includes(letter)
            )}
            addGuessedOption={addGuessedOption}
          />
        </div>
        <HangmanDrawing numberOfGuesses={incorrectGuesses} />
        <SubmitAnswer
          guessedOptions={guessedOptions}
          answers={answers}
          setIsWinner={setIsWinner}
          incorrectGuesses={incorrectGuesses}
          setIncorrectGuesses={setIncorrectGuesses}
        />
      </div>
      <div className="p-4 rounded-full m-4 bg-gray-500 w-10 h-10">
        <button onClick={navigateToDashboard} className="absolute top-4 right-4 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default HangmanGame;
