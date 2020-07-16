const router = require('express').Router();
const ctrl = require('../controllers/index-controller');

router.get('/', ctrl.resume);

module.exports = router;
