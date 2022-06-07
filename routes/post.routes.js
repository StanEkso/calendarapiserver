const Router = require('express').Router;
const authMiddleware = require('../middleware/auth.middleware')
const router = new Router();
const postController = require('../controllers/posts.controller')

router.post('/create',authMiddleware,postController.createPost);
router.get('/', postController.getPosts);
router.delete('/:id',authMiddleware,postController.deletePost);
router.put('/',authMiddleware,postController.updatePost);
module.exports = router;