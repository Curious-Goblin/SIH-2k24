"use client"

import { useRecoilState } from "recoil";
import Button from "./button";
import GoogleButton from "./googleButton";
import TextArea from "./textArea";
import { emailAtom, passwordAtom } from "../atoms/userdetails";
import { signIn } from "next-auth/react";

export default function SignInComponent() {
    const [emailState, setEmailState] = useRecoilState(emailAtom)
    const [passwordState, setPasswordState] = useRecoilState(passwordAtom)
    const handleChange = (setState: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setState(event.target.value);
        };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            emailAddress: emailState,
            password: passwordState
        });

        if (result?.error) {
            console.error(result.error);
        } else {
            window.location.href = "/";
        }
    };
    return (
        <div className="w-full">
            <div className="text-3xl font-bold text-[#654B3E]">
                Login to your Account
            </div>
            <div className="text-2xl font-extralight text-[#654B3E]">
                with your registered Email Address
            </div>
            <div className="flex flex-col justify-center items-center pt-10 pb-4 w-full">
                <div className="flex flex-col w-full">
                    <TextArea
                        label="Email Address*"
                        placeholder="Enter Email Address"
                        type="text"
                        onChange={handleChange(setEmailState)} />
                    <TextArea
                        label="Enter Password*"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange(setPasswordState)} />
                </div>
            </div>
            <Button onClick={handleSubmit} name="Login" />
            <div className="flex items-center pt-5 pb-5">
                <div className="flex-grow border-t border-gray-300" />
                <span className="px-4 text-gray-400 text-sm">Or</span>
                <div className="flex-grow border-t border-gray-300" />
            </div>
            <GoogleButton text="Login with Google" />
        </div>
    )
}