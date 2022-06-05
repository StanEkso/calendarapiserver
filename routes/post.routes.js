const Router = require('express').Router;

const router = new Router();
const postController = require('../controllers/posts.controller')

router.post('/create',postController.createPost);
router.get('/', postController.getPosts);
router.delete('/:id',postController.deletePost);
router.put('/', postController.updatePost);
module.exports = router;