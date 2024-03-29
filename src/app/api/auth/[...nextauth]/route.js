import { connectToDB } from "@/lib/utils";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials) {
                const { email, senha } = credentials;

                try {
                    await connectToDB();

                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    };

                    const passMatch = await bcrypt.compare(senha, user.senha);

                    if (!passMatch) {
                        return null;
                    };

                    return user;
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };