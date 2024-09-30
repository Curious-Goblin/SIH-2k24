"use client"

import { useRecoilState } from "recoil";
import { useState } from "react";
import Button from "./button";
import GoogleButton from "./googleButton";
import TextArea from "./textArea";
import { emailAtom, nameAtom, passwordAtom } from "../atoms/userdetails";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name must not exceed 50 characters" })
        .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
    emailAddress: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export default function SignUpComponent() {
    const [nameState, setNameState] = useRecoilState(nameAtom);
    const [emailState, setEmailState] = useRecoilState(emailAtom);
    const [passwordState, setPasswordState] = useRecoilState(passwordAtom);
    const [errors, setErrors] = useState<{ name?: string, emailAddress?: string, password?: string }>({});
    const [authError, setAuthError] = useState<string | null>(null);  // To store backend errors
    const router=useRouter()

    const handleNavigation=()=>{
        router.push('/auth/signin')
    }

    const handleChange = (setState: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setState(event.target.value);
        };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const validationResult = signUpSchema.safeParse({
            name: nameState,
            emailAddress: emailState,
            password: passwordState,
        });

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.format();
            setErrors({
                name: formattedErrors.name?._errors[0],
                emailAddress: formattedErrors.emailAddress?._errors[0],
                password: formattedErrors.password?._errors[0],
            });
            return;
        }

        setErrors({}); 

        const result = await signIn('credentials', {
            redirect: false,
            emailAddress: emailState,
            password: passwordState,
            name: nameState,
            isSignUp: true
        });

        if (result?.error) {
            setAuthError(result.error);
        } else {
            window.location.href = "/";
        }
    };

    const handleGoogleSignIn = async (e: any) => {
        e.preventDefault();
        const result = await signIn('google', {
            redirect: false,
            callbackUrl: "/"
        });
    };

    return (
        <div className="w-full">
            <div className="text-3xl font-bold text-[#654B3E]">
                Sign Up to ConstiGame
            </div>
            <div className="text-2xl font-extralight text-[#654B3E]">
                with your registered Email Address
            </div>
            <div className="flex flex-col justify-center items-center pt-10 pb-4 w-full">
                <div className="flex flex-col w-full">
                    <TextArea
                        label="Enter Name*"
                        placeholder="Name"
                        type="text"
                        onChange={handleChange(setNameState)} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    <TextArea
                        label="Email Address*"
                        placeholder="Enter Email Address"
                        type="text"
                        onChange={handleChange(setEmailState)} />
                    {errors.emailAddress && <p className="text-red-500 text-sm">{errors.emailAddress}</p>}

                    <TextArea
                        label="Enter Password*"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange(setPasswordState)} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
            </div>

            {authError && <p className="text-red-500 text-sm">{authError}</p>}

            <Button style="rounded-md bg-[#654B3E] text-white font-medium flex justify-center py-3" onClick={handleSubmit} name="Sign Up" />
            <div className="flex items-center pt-5 pb-5">
                <div className="flex-grow border-t border-gray-300" />
                <span className="px-4 text-gray-400 text-sm">Or</span>
                <div className="flex-grow border-t border-gray-300" />
            </div>
            <GoogleButton onClick={handleGoogleSignIn} text="Sign Up with Google" />
            <div onClick={handleNavigation} className="text-md cursor-pointer underline text-[#654B3E] font-semibold flex justify-center pt-8">
                Already have an account? Login
            </div>
        </div>
    )
}
