const { isLoggedIn } = require("./middlewares");
const { Post, Image, Comment, User, Hashtag } = require("../models");
const express = require("express");
const router = express.Router();

router.patch(`/:commentId/like`, isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId },
    });
    if (!comment) {
      return res.status(403).send("댓글이 존재하지 않습니다.");
    }
    await comment.addComment_Likers(req.user.id);
    res.json({ CommentId: comment.id, UserId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete(`/:commentId/like`, isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId },
    });
    if (!comment) {
      return res.status(403).send("댓글이 존재하지 않습니다.");
    }
    await comment.removeComment_Likers(req.user.id);
    res.json({ CommentId: comment.id, UserId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
