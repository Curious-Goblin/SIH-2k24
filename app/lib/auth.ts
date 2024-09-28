import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import User from "@/db/models/User";
import connectDB from "@/db";
import { JWT } from "next-auth/jwt";
import { Account, Profile } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

export interface CustomUser {
    id: string;
    email?: string | null;
    name?: string | null;
    password?: string | null;
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                emailAddress: { label: "Email", type: "text", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text", placeholder: "Your Name", optional: true },
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
                            name: credentials.name,
                        });

                        await newUser.save();

                        return {
                            id: newUser.id.toString(),
                            email: newUser.email,
                            name: newUser.name,
                        }; 
                    } else {
                        const user = await User.findOne({ email: emailAddress });
                        if (!user) {
                            throw new Error("No user found with this email.");
                        }
                        if (!user.password) {
                            throw new Error("This account was created via Google, please login with Google.");
                        }
                        const isPasswordValid = await bcrypt.compare(password, user.password);
                        if (!isPasswordValid) {
                            throw new Error("Invalid password.");
                        }

                        return {
                            id: user.id.toString(),
                            email: user.email,
                            name: user.name,
                        };
                    }
                } catch (err: any) {
                    console.error("Error occurred during authorization:", err);
                    throw new Error("Authorization failed. Please try again."); 
                }
            },
        }),
    ],

    pages: {
        signIn: '/auth/signin',
        signUp: '/auth/signup',
    },

    callbacks: {
        async signIn({ user, account }: { user: CustomUser | AdapterUser; account: Account | null }) {
            await connectDB();

            if (account?.provider === 'google') {
                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    const newUser = new User({
                        email: user.email,
                        name: user.name || '',
                        password: null,
                    });

                    await newUser.save();
                }
            }

            return true;
        },
        async jwt({ token, user }: { token: JWT; user?: CustomUser }) {
            if (user) {
                token.id = user.id; // Save user ID in token
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            if (token) {
                session.id = token.id; // Add custom user ID to session
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET || "secret",
};
