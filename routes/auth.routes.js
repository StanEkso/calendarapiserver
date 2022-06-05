const Router = require('express').Router;

const router = new Router();
const authController = require('../controllers/auth.controller')

router.post('/signup',authController.createUser);
router.post('/login', authController.logIntoAccount);
router.get('/', authController.getUsers);
router.delete('/:id', authController.deleteUser);

module.exports = router;