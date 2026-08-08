import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.adminUser.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.isActive) {
            return null;
          }

          const isCorrect = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!isCorrect) {
            return null;
          }

          // Update lastLoginAt & audit log
          try {
            await prisma.adminUser.update({
              where: { id: user.id },
              data: { lastLoginAt: new Date() },
            });

            await prisma.auditLog.create({
              data: {
                adminEmail: user.email,
                adminRole: user.role,
                action: "LOGIN",
                entity: "AdminUser",
                entityId: user.id,
                details: `Admin logged in successfully (${user.email})`,
              },
            });
          } catch (e) {
            console.error("Failed to update last login / audit record:", e.message);
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("Database query error in NextAuth authorize:", err.message);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

