import express from 'express';
import { auth } from 'express-openid-connect';
import { auth0Config } from '../config/auth0Config.js';
import { prisma } from '../config/prismaConfig.js';

const router = express.Router();

// Auth router
router.use(auth(auth0Config));

// Return user info if logged in
router.get('/user', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: req.oidc.user
    });
  } else {
    res.json({
      isAuthenticated: false,
      user: null
    });
  }
});

// Profile endpoint
router.get('/profile', (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  res.json(req.oidc.user);
});

router.get('/', (req, res) => {
  res.redirect('http://localhost:5173/'); // or send a helpful message/page
});


// Callback handler
router.get('/callback', async (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      const auth0User = req.oidc.user;
      
      // Check if user exists in your database
      let user = await prisma.user.findUnique({
        where: { email: auth0User.email }
      });
      
      // If user doesn't exist, create one
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: auth0User.email,
            name: auth0User.name || auth0User.nickname,
            image: auth0User.picture,
            // Default role - adjust based on your schema
            role: 'USER'
          }
        });
      }
      
      // Redirect to home page after successful login and user creation
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export { router as authRoute };