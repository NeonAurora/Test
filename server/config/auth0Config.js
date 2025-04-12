import { config } from 'dotenv';
config();

export const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:8200/api/auth',
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  routes: {
    login: '/login',
    logout: '/logout',
    callback: '/callback'
  },
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email'
  }
};