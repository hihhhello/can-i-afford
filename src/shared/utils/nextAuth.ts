import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const NEXT_AUTH_OPTIONS: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Template',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const templateUser = {
          password: credentials?.password,
          username: credentials?.username,
          id: '1',
          accessToken: 'my.token.secret',
        };

        return templateUser;

        /**
         * TODO: uncomment when BE with Auth is added.
         */
        // const res = await fetch(`${process.env.SERVER_URL}/signin`, {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     password: credentials?.password,
        //     username: credentials?.username,
        //   }),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // const user: { accessToken: string } = await res.json();

        // if (res.ok && user) {
        //   const userInfoResponse = await fetch(`${process.env.SERVER_URL}/me`, {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Authorization: `Bearer ${user.accessToken}`,
        //     },
        //   });

        //   const userInfo: { email: string; id: string } =
        //     await userInfoResponse.json();

        //   return { ...user, ...userInfo };
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user = token;

      return session;
    },
  },
};
