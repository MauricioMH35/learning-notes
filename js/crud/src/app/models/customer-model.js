const mongoose = require('../../configs/database');
const bcrypt = require('bcryptjs');

const schema = new  mongoose.Schema({
   name: {
      type: String,
      required: false
   },
   birth: [
      {
         type: Number,
         required: false
      },
      {
         type: Number,
         required: false
      },
      {
         type: Number,
         required: false
      }
   ],
   sexgender: {
      type: String,
      enum: ['male', 'female', 'bisexual'],
      default: 'male',
      required: false
   },
   bio: {
      type: String,
      required: false
   },
   photo: {
      type: String,
      required: false
   },
   email: {
      type: String,
      unique: true,
      required: true
   },
   password: {
      type: String,
      select: false,
      required: true
   },
   accessLevel: {
      type: String,
      enum: ['visitor', 'user', 'admin'],
      default: 'user',
      lowercase: true,
      select: false,
      required: true
   }
});

schema.pre('save', async function (next) {
   const hash = await bcrypt.hash(this.password, 10);
   this.password = hash;
   next();
});

const model = mongoose.model('Customer', schema);
module.exports = model;