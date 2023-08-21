import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from '@/lib/mongoose';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);

// No need for isAdminEmail function and session callback logic

export async function isAdminRequest(req, res) {
  // No need to check isAdminEmail in this function as well
}
