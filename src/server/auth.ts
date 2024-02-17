import {getServerSession, NextAuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {compareSync} from "bcryptjs";
import {PrismaClient} from "@prisma/client";
import {User} from "@/types/user";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({token, account, profile}) {
            if (account && account.type === "credentials") {
                token.userId = account.providerAccountId;
            }

            return token;
        },
        async session({session, token, user}){
            session.user.id = token.userId;

            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'username'},
                password: {label: 'Password', type: 'password'}
            },
            // @ts-ignore
            async authorize (credentials, req){
                const {email, password} = credentials as {
                    email: string,
                    password: string
                };

                const user = await prisma.user.findUnique(
                    {
                        where: {
                            email: email
                        }
                    }
                ) as User

                if (!user) {
                    return null;
                }

                if (!compareSync(password, user.password)) {
                    return null
                }

                return user
            }
        }),
    ]
}

export const getServerAuthSession = () => getServerSession(authOptions);