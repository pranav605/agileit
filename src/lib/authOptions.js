import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data.user;
          console.log("User object from backend:", user, res);
          if (res.data.success && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Login request failed:", error.message);
          if (error.response) {
            console.error("Response data:", error.response.data);
          }
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signIn'
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          const res = await axios.post('http://localhost:5000/api/auth/sync', {
            email: token.email,
            name: token.name,
            image: token.picture,
            provider: account.provider
          });

          token.id = res.data.id;
        } catch (err) {
          console.error("SSO sync error:", err);
        }
      }

      if (user?._id) {
        token.id = user._id;
      }

      return token;
    },

    async session({ session, token }) {
      // Log the token received by the session callback
      console.log("Token in session callback:", token);
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      // Log the session after modification
      console.log("Session after session callback:", session);
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/app`;
    }
  },
};
