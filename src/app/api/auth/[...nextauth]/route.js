import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // use absolute or relative import

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
