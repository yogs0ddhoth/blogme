const router = require('express').Router();
import { Request, Response } from 'express';
import { withAuth } from '../../utils/auth';
import models from '../../models';

// create a post
router.post('/', withAuth, async (req:Request, res:Response) => {
  // console.log(req.body);
  try {
    const newPost = await models.Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add a comment to the associated project
router.post('/:id', withAuth, async (req:Request, res:Response) => {
  try {
    
    console.log({ 
      ...req.body,
      author_id: req.session.user_id, 
      project_id: req.params.id,
    });

    const newComment = await models.Comment.create({ 
      ...req.body,
      author: req.session.user_name,
      author_id: req.session.user_id, 
      post_id: req.params.id,
    });

    console.log(newComment);
    
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// todo: add elements and script to edit comments on the front end
router.put('/:id', async (req:Request, res:Response) => {
  try {
    const update = await models.Comment.update(
      {comment: req.body.comment},
      {where: {id: req.params.id}}
    )
    // const update = await Comment.findByPk(req.params.id);
    // update.comment = req.body.comment;
    
    // await update.save();

    const updatedComment = await models.Comment.findByPk(req.params.id);
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
})

// delete operation
router.delete('/:id', withAuth, async (req:Request, res:Response) => {
  try {
    // delete post
    const postData = await models.Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
