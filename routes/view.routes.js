const Router = require('express').Router;
const router = new Router();
const viewController = require('../controllers/views.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/add',viewController.createView);
router.get('/', viewController.getViews);
router.delete('/delete',authMiddleware, viewController.deleteViews)
router.post('/append',viewController.appendView)
router.get('/:name', viewController.getUsersViews)
module.exports = router;