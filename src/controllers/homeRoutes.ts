const router = require('express').Router();
import { Request, Response } from 'express';
import { withAuth } from '../utils/auth';
import models from '../models';

// Route to render homepage
router.get('/', async (req: Request, res: Response) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await models.Post.findAll(
      {
      include: [
        {
          model: models.User,
          attributes: ['name'],
        },
      ],
      }
    );
    
    // Serialize data so the template can read it
    const posts = postData.map((project) => project.get({ plain: true }));
    console.log(posts);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to a render a single post and its associated comments
router.get('/post/:id', async (req:Request, res:Response) => {
  // Get a single post and JOIN with user and comment data
  try {
    const postData = await models.Post.findByPk(req.params.id, {
      include: [
        models.User,
        {
          model: models.Comment,
          attributes: ['comment', 'author', 'date_created'],
        }
      ],
    });
    
    let post;
    if (postData) {
      post = postData.get({ plain: true });
    }
    
    // Pass serialized data and session flag into template
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req:Request, res:Response) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await models.User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: models.Post }],
    });

    let user;
    if (userData) {
      user = userData.get({ plain: true });
    }

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req:Request, res:Response) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req:Request, res:Response) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

export default router;
