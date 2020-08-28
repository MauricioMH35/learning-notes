const router = require('express').Router();
const ctrl = require('../controllers/customer-controller');
const authorize = require('../middlewares/authorize-middleware');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/logout/:id', authorize, ctrl.logout);
router.post('/update/:id', authorize, ctrl.update);
router.post('/delete/:id', authorize, ctrl.delete);
router.get('/:id', authorize, ctrl.viewer);

module.exports = server => server.use('/customer', router);
