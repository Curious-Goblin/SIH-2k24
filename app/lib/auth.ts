import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import User from "@/db/models/User";
import connectDB from "@/db";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                emailAddress: { label: "your email", type: "text", placeholder: "example@gmail.com", required: true },
                password: { label: "your password", type: "password", required: true },
            },
            async authorize(credentials: any, req: any) {
                await connectDB();

                try {
                    const { emailAddress, password } = credentials;

                    const isSignUp = req.body.isSignUp;

                    if (isSignUp) {
                        const existingUser = await User.findOne({ email: emailAddress });

                        if (existingUser) {
                            throw new Error("User already exists. Please sign in.");
                        }

                        const hashedPassword = await bcrypt.hash(password, 10);

                        const newUser = new User({
                            email: emailAddress,
                            password: hashedPassword,
                            name: credentials.name
                        });

                        await newUser.save();

                        return newUser;
                    } else {
                        const user = await User.findOne({ email: emailAddress });

                        if (!user) {
                            throw new Error("No user found with this email.");
                        }

                        const isPasswordValid = await bcrypt.compare(password, user.password);

                        if (!isPasswordValid) {
                            throw new Error("Invalid password.");
                        }

                        return user;
                    }
                }
                catch (err) {
                    console.error("error occured", err)
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        signUp: '/auth/signup'
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
};