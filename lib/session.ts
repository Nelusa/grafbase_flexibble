import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
//import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export interface AdapterUser extends User {
  id: string;
  email: string;
  emailVerified: Date | null;
}

/* import { createUser, getUser } from "./actions"; */
import { SessionInterface, UserProfile } from "@common.types";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, //this is a non-null assertion operator
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, //this is a non-null assertion operator
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60, //this is approximately 13 hours
        },
        secret
      ); //encodedToken is equal to the token that we are going to sign with the secret

      return encodedToken;
    }, //this is a function that takes a secret and a token and returns a promise that resolves to an encoded token
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    }, //this is a function that takes a secret and a token and returns a promise that resolves to a decoded token
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = (await getUser(email)) as { user?: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    }, //this is a function that takes a session and returns a promise that resolves to a session --> we need it to get the user data from the database (not only from the provider)
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExists = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };

        if (!userExists.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }

        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
