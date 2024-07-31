import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Respond, Item } from "@/app/components/Interface";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const response = await fetch(
          `https://yuchen-react-proj.azurewebsites.net/login/?username=${credentials?.email}&password=${credentials?.password}`
        );
        const res: Respond = await response.json();

        if (res.status !== "success") {
          return null;
        }

        const user = {
          id: "1",
          email: credentials?.email,
          reward: res.reward,
          cart: res.cart,
        };
        //console.log(user);

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.reward = user.reward;
        token.cart = user.cart;
      }
      //console.log('JWT token:', token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.reward = token.reward as number;
        session.user.cart = token.cart as Item[];
      }
      //console.log('Session:', session.user.cart[0].name);
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
