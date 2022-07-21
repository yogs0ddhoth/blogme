import { Request, Response, NextFunction} from "express";
export const withAuth = (req:Request, res:Response, next:NextFunction) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};
