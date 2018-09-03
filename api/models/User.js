const mongoose = require('mongoose');
const validator = require('validator');
const Typo = require('../utils/typo.js');

const { Schema } = mongoose;

// create a Schema
const userSchema = new Schema({

  firstName: { 
    type: String, 
    minlength: 2,
    maxlength: 63,
    required: true 
  },
  lastName:  { 
    type: String, 
    minlength: 2,
    maxlength: 63,
    required: true 
  },
  username: { 
    type: String, 
    minlength: 2,
    maxlength: 63,
    required: true,
    lowercase: true, 
    unique: true 
  },
  email: { 
    type: String, 
    minlength: 3,
    required: true, 
    lowercase: true, 
    unique: true,
    validate:{ 
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: 'Please Enter a Valid Email'
    }
  },
  password: { 
    type: String,
    required: true
   },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  isAdmin: { 
    type: Boolean, 
    default: false 
  }
  
});

// Create Virtul Attribute -- to evaluate the fullname 
userSchema.virtual('fullName').get(function() {
  // Do Not Use Arrow Function or You will lose this :)
  return `${Typo.capFirstLetter(this.firstName)} ${Typo.capFirstLetter(this.lastName)}`;
});

// To Allow Virtuals on Client 
userSchema.set('toJSON', {
  virtuals: true
});

// userSchema.set('toObject', {
//   virtuals: true
// });

// Create a Model 
const User = mongoose.model('user', userSchema);

module.exports = User;

