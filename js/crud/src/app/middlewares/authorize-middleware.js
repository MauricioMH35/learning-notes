const jwt = require('jsonwebtoken');

// Middleware para autenticação do código token.
module.exports = (req, res, next) => {
   // Capturando código token.
   const authHeader = req.headers.authorization;

   // Código token não fornecido.
   if(!authHeader) {
      return res.status(401).send({ 
         status: res.statusCode,
         message: 'Token code was not provided!',
         date: Date.now
      });
   }

   // Separando o código token.
   const parts = authHeader.split(' ');

   // Separação do código token não foi bem sucedida.
   if(!parts.length === 2) {
      return res.status(401).send({
         status: res.statusCode,
         message: 'An unexpected error occurred in the provided token code!',
         date: Date.now
      });
   }

   // Capturando a separação das partes do código token.
   const [ scheme, token ] = parts;

   // Código token não esta bem formulado.
   if(!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({  
         status: res.statusCode,
         message: 'Token code is malformed!',
         date: Date.now 
      });
   }

   // Verificando código token.
   jwt.verify(token, 'salt-key', (err, decoded) => {
      if(err) {
         return res.status(401).send({ 
            status: res.statusCode,
            message: 'Supplied token code is invalid!',
            date: Date.now
         });
      }
      req.userId = decoded.id;
      return next(); 
   });
};