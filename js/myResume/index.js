const http = require('http');
const app = require('./src/app');

const port = NormalizePort(process.env.PORT || 80);
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('listening', onListening);
server.on('error', OnError);

function NormalizePort(v) {
   const port = parseInt(v, 10);

   if(isNaN(port)) throw v;
   if(port >= 0) return port;

   return false;  
}

function OnError(e) {
   if(e.syscall !== "listen") throw e;

   const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

   switch(e.code) {
      case "EACCESS":
         console.log(`${bind} is already elevated privileges`);
         process.exit(1);
         break;
      case "EADDRINUSE":
         console.log(`${bind} is already in use`);
         process.exit(1);
         break;
      default:
         break;
   }
}

function onListening() {
   const addr = server.address();
   const bind = typeof addr === "string" ? `Pipe ${addr}` : `Port ${addr.port}`;

   console.log(`Server is listening on ${bind}`);
}