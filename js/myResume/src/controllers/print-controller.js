const model = require('../models/myResume-model');
exports.resume = async (req, res, next) => {
   try {
      let data =  await model;

      res.status(200).render('print', data );
   } catch(e) {
      res.status(404).send({ message: 'Not found!' });
   }
};