import NextAuth, { DefaultSession } from "next-auth"
import { Item } from "@/app/components/Interface";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      cart: Item[];
      reward: number;
    }
  }

  interface User {
    reward: number;
    cart: Item[];
  }

  interface JWT {
    reward: number;
    cart: Item[];
  }
}

