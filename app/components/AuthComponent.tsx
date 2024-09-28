import Image from "next/image";
import SignInComponent from "./SiginComponent";
import LoginTextSvg from "../svg/loginTextSvg";
import LogoSvg from "../svg/logoSvg";
import SignUpComponent from "./SignupComponent";
import SignUpTextSvg from "../svg/SignupTextSvg";

export default function AuthComponent({ auth }: { auth: string }) {
    return (
        <div className="flex w-screen h-screen">
            <div className="relative max-h-screen w-1/2 overflow-hidden">
                <Image
                    src="/bgImage.png"
                    layout="responsive"
                    width={1018}
                    height={1161}
                    alt="Background"
                    className="object-cover"
                />
                {auth === "signup" &&
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <SignUpTextSvg />
                    </div>
                }
                {auth === "signin" &&
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <LoginTextSvg />
                    </div>
                }
            </div>

            <div className="relative flex flex-col justify-center items-center w-1/2">
                <div className="absolute top-10 left-16">
                    <LogoSvg />
                </div>
                <div>
                    {auth === 'signin' &&
                        <SignInComponent />
                    }
                    {auth === 'signup' &&
                        <SignUpComponent />
                    }
                </div>
            </div>
        </div>
    );
}





