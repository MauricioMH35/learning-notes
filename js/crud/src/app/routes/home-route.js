const router = require('express').Router();

router.get('/', async (req, res, next) => {
   try {
      res.status(200).json({
         message: 'Home page!'
      });
   } catch(err) {
      res.status(400).json({
         error: res.statusCode,
         message: 'BAD REQUEST!',
         date: Date.now
      });
   }
});

module.exports = server => server.use('/', router);