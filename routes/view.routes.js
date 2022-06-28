const Router = require('express').Router;
const router = new Router();
const viewController = require('../controllers/views.controller')

router.post('/add',viewController.createView);
router.get('/', viewController.getViews);
router.delete('/delete', viewController.deleteViews)
router.post('/append',viewController.appendView)
router.get('/users', viewController.getUsersViews)
module.exports = router;