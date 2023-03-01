import NextAuth, { NextAuthOptions } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { NextApiRequest, NextApiResponse } from 'next'
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity'
import Auth0Provider from 'next-auth/providers/auth0'

const options: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }), // only if you use sign in with credentials
  ],
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(options)
