const router = require('express').Router();
const ctrl = require('../controllers/print-controller');

router.get('/', ctrl.resume);

module.exports = router;