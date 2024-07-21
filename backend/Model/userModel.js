const mongoose = require('mongoose');

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userDetail: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    middleName: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    address: {
      type: String
    },
    gender: {
      type: String
    }
  }
});

export default mongoose.model('User', UserSchema);

