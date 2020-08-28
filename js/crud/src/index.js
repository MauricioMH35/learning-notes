const express = require('express');
const compression = require("compression");
const cors = require('cors');

function NormalizePort(v) {
   const port = parseInt(v, 10);
   if(isNaN(port)) return v;
   if(port >= 0) return port;
   return false;
}

const port = NormalizePort(process.env.PORT || 80);
const server = express();

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ extended: false }));
server.use(compression());
server.use(cors());
server.disable('x-powered-by');

server.set(express.static(__dirname + 'public'));

require('./app/routes/home-route')(server);
require('./app/routes/customer-route')(server);

server.listen(port, () => {
   console.log('\x1b[35m' + 'SERVER IS RUNNING!' + '\x1b[37m');
});