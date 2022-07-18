const router = require('express').Router();
import { Request, Response } from 'express';
import models from '../../models';

// create user
router.post('/', async (req: Request, res: Response) => {
  try {
    const userData = await models.User.create(req.body);

    // save user data to session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const userData = await models.User.findOne({ where: { email: req.body.email } });
    // email validation
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // password validation
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    
    // save user information to session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// logout user
router.post('/logout', (req: Request, res: Response) => {
  // only work if the user is logged in
  if (req.session.logged_in) {
    // clear session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

export default router;
