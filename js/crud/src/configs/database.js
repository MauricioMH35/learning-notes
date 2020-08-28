const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/crud', {
   useNewUrlParser: true,
   useUnifiedTopology: true, 
   useCreateIndex: true,
   useFindAndModify: false,
}).catch(err => console.error('mongoose.:' + err));

module.exports = mongoose;