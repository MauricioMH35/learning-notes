const jwt = require('jsonwebtoken');

exports.generate = (params = {}) => {
   return jwt.sign(params, 'salt-key', { expiresIn: '1d' });
};