"use client";

import { useRecoilState } from "recoil";
import Button from "./button";
import GoogleButton from "./googleButton";
import TextArea from "./textArea";
import { emailAtom, passwordAtom } from "../atoms/userdetails";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
    emailAddress: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export default function SignInComponent() {
    const [emailState, setEmailState] = useRecoilState(emailAtom);
    const [passwordState, setPasswordState] = useRecoilState(passwordAtom);
    const [errors, setErrors] = useState<{ name?: string, emailAddress?: string, password?: string }>({});
    const [authError, setAuthError] = useState<string | null>(null); 
    const router=useRouter()

    const handleNavigation=()=>{
        router.push('/auth/signup')
    }
    const handleChange = (setState: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setState(event.target.value);
        };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const validationResult = signInSchema.safeParse({
            emailAddress: emailState,
            password: passwordState,
        });

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.format();
            setErrors({
                emailAddress: formattedErrors.emailAddress?._errors[0],
                password: formattedErrors.password?._errors[0],
            });
            return;
        }

        const result = await signIn("credentials", {
            redirect: false,
            emailAddress: emailState,
            password: passwordState,
        });

        if (result?.error) {
            setAuthError(result.error);
        } else {
            window.location.href = "/";
        }
    };

    const handleGoogleSignIn = async (e: any) => {
        e.preventDefault();
        const result = await signIn("google", {
            redirect: false,
            callbackUrl: "/",
        });
    };

    return (
        <div className="w-full">
            <div className="text-3xl font-bold text-[#654B3E]">Login to your Account</div>
            <div className="text-2xl font-extralight text-[#654B3E]">
                with your registered Email Address
            </div>
            <div className="flex flex-col justify-center items-center pt-10 pb-4 w-full">
                <div className="flex flex-col w-full">
                    <TextArea
                        label="Email Address*"
                        placeholder="Enter Email Address"
                        type="text"
                        onChange={handleChange(setEmailState)}
                    />
                    {errors.emailAddress && <p className="text-red-500 text-sm pb-4">{errors.emailAddress}</p>}
                    <TextArea
                        label="Enter Password*"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange(setPasswordState)}
                    />
                    {errors.password && <p className="text-red-500 text-sm pb-4">{errors.password}</p>}

                </div>
            </div>

            {authError && <p className="text-red-500 text-sm pb-4">{authError}</p>}

            <Button style="rounded-md bg-[#654B3E] text-white font-medium flex justify-center py-3" onClick={handleSubmit} name="Login" />
            <div className="flex items-center pt-5 pb-5">
                <div className="flex-grow border-t border-gray-300" />
                <span className="px-4 text-gray-400 text-sm">Or</span>
                <div className="flex-grow border-t border-gray-300" />
            </div>
            <GoogleButton onClick={handleGoogleSignIn} text="Login with Google" />
            <div onClick={handleNavigation} className="text-md underline cursor-pointer text-[#654B3E] font-semibold flex justify-center pt-8">
                Don't have an account? Signup
            </div>
        </div>
    );
}
