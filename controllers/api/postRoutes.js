const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add a comment to the associated project
router.post('/:id', withAuth, async (req, res) => {
  try {
    
    console.log({ 
      ...req.body,
      author_id: req.session.user_id, 
      project_id: req.params.id,
    });

    const newComment = await Comment.create({ 
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

router.put('/:id', async (req, res) => {
  try {
    const update = await Comment.update(
      {comment: req.body.comment},
      {where: {id: req.params.id}}
    )
    // const update = await Comment.findByPk(req.params.id);
    // update.comment = req.body.comment;
    
    // await update.save();

    const updatedComment = await Comment.findByPk(req.params.id);
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
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

module.exports = router;
