const Customer = require('../models/customer-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authService = require('../services/auth-service');
const badRequest = { status: 400, message: 'BAD REQUEST!', date: Date.now };

// Requisição de registro de usuário.
exports.register = async (req, res, next) => {
   try {
      // Capturando dados do client-side.
      const {
         name,
         birth,
         sexgender,
         bio,
         photo,
         email,
         password
      } = req.body;


      // Customer já existe.
      if(await Customer.findOne({ email })) {
         return res.status(400).json({
            status: res.statusCode,
            message: 'The customer already exists!',
            date: Date.now
         });
      }
      
      // Criando customer no db.
      const customer = await Customer.create({
         name,
         birth,
         sexgender,
         bio,
         photo,
         email,
         password
      }).catch(err => {
         if(err) {
            console.error(err);
         }
      });

      // Para não mostrar dados no client-side.
      customer.password = undefined;
      customer.accessLevel = undefined;
      customer.accessLog = undefined;
      
      // Resposta da requisição.
      res
         .status(200)
         .json({
            status: res.statusCode,
            message: 'The customer was created successfully!',
            customer
         });

   } catch(err) {
      // Resposta do callback de erro da requisição.
      res.status(400).json(badRequest);
   }
};

// Requisição de autenticação.
exports.login = async (req, res, next) => {
   try {
      // Capturando dados do client-side.
      const { email, password } = req.body;

      // Procurando pelo customer.
      const customer = await Customer.findOne({ email }).select('+password');

      // Não foi encontrado.
      if(!customer) {
         return res.status(400).json({
            status: res.statusCode,
            message: 'The customer does not exists!',
            date: Date.now
         });
      }

      // Senha não corresponde.
      if(!await bcrypt.compare(password, customer.password)) {
         return res.status(200).json({
            status: res.statusCode,
            message: 'The password entered does not match the access!',
            date: Date.now
         });
      }

      // Criando código token.
      const token = await authService.generate({ 
         id: customer.id, 
         name: customer.name,
         email: customer.email
      });

      // Para não mostrar dados no client-side.
      customer.password = undefined;

      // Resposta da requisição.
      res.header('Authorization', `Bearer ${token}`);
      res.json({
            status: res.statusCode,
            message: 'Has been successfully authenticated!',
            id: customer.id,
            token
         });

   } catch(err) {
      // Resposta para o callback de erro da requisição.
      res.status(400).json(badRequest);
      console.error(err);
   }
};

// Requisição de desautenticação.
exports.logout = async (req, res, next) => {
   try {
      // Capturando dados do client-side.
      const { id } = req.params;
      
      // Procurando customer.
      const customer = await Customer.findById(id);

      // Caso o customer não exista.
      if(!customer) {
         return res.status(400).json({
            status: res.statusCode,
            message: 'The customer does not exist!',
            date: Date.now
         });
      }

      // Resposta da requisição.
      res.header('Authorization', `Bearer null`);
      res.status(200).json({
         status: res.statusCode,
         message: 'logout request!',
         token: 'token'
      });

   } catch(err) {
      // Resposta para o callback de erro da requisição.
      res.status(400).json(badRequest);
      console.error(err);
   }
};

// Requisição para atualização do customer.
exports.update = async (req, res, next) => {
   try {
      // Capturando dados do client-side.
      const { id } = req.params;
      const {
         name,
         birth,
         sexgender,
         bio,
         photo,
         email,
         password
      } = req.body;

      // Procurando pelo customer no db.
      const customer = await Customer.findByIdAndUpdate(id, {
         name,
         birth,
         sexgender,
         bio,
         photo,
         email,
         password
      },
      {
         new: true
      });

      // Criando código token.
      const token = await authService.generate({
         id: customer.id,
         name: customer.name,
         email: customer.email
      });

      // Para não mostrar dados no client-side.
      customer.password = undefined;

      // Resposta da requisição.
      res.header('Authorization', `Bearer ${token}`);
      res.status(200).json({
         status: res.statusCode,
         message: 'The customer has been updated successfully!',
         token,
         customer
      });

   } catch(err) {
      // Resposta para o callback de erro da requisição.
      res.status(400).json(badRequest);
   }
};

// Requisição para deletar o customer.
exports.delete = async (req, res, next) => {
   try {
      // Capturando dados do client-side.
      const { id } = req.params;

      // Capturando dados do db.
      const customer = await Customer.findByIdAndRemove(id, (err) => {
         if(err) {
            return res.status(400).json({
               status: res.statusCode,
               message: 'It was not possible to complete the request!',
               date: Date.now
            });
         }
      });

      // Resposta da requisição.
      res.header('Authorization', `Bearer null`);
      res.status(200).json({
         status: res.statusCode,
         message: 'The customer has been successfully removed!',
         date: Date.now
      });

   } catch(err) {
      // Resposta para o callback de erro da requisição.
      res.status(400).json(badRequest);
      console.error(err);
   }
};

// Requisição para visualizar customer.
exports.viewer = async (req, res, next) => {
   try {
      // Capturando dados do client-side.
      const { id } = req.params;

      // Procurando customer no db.
      const customer = await Customer.findById(id, (err) => {
         if(err) {
            return res.status(400).json({
               status: res.statusCode,
               message: 'The customer does not found!',
               date: Date.now
            });
         }
      });

      // Resposta da requisição.
      res.status(200).json({
         status: res.statusCode,
         message: 'The customer has been found!',
         customer
      });

   } catch(err) {
      // Resposta para o callback de erro da requisição.
      res.status(400).json(badRequest);
      console.error(err);
   }
};