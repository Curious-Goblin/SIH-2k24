import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import User from "@/db/models/User";
import connectDB from "@/db";

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

                        return newUser;
                    } else {
                        const user = await User.findOne({ email: emailAddress });
                        console.log(user);
                        if (!user) {
                            throw new Error("No user found with this email.");
                        }
                        if (user.password === null) {
                            throw new Error("This account was created via google, please login with google")
                        }
                        const hashedPassword = await bcrypt.hash(password, 10);
                        const isPasswordValid = await bcrypt.compare(hashedPassword, user.password);
                        console.log("user password: " + user.password);
                        if (!isPasswordValid) {
                            throw new Error("Invalid password.");
                        }

                        return user;
                    }
                } catch (err: any) {
                    console.error("Error occurred during authorization:", err);
                    throw new Error(err.message);
                }
            },
        })
    ],

    pages: {
        signIn: '/auth/signin',
        signUp: '/auth/signup',
    },

    callbacks: {
        async signIn({ user, account }) {
            await connectDB();

            if (account.provider === 'google') {
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
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.id = token.id;
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET || "secret",
};
