const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  full_name: {
      type: String,
      require: false
  },
  email: {
    type: String,
    require: false
},
mobile_no: {
  type: String,
  require: false
},
password :  {
  type: String,
  require: false
},
file: [{
    file_name: {
        type: String,
        required: false
    },
    short_code: {
        type: String,
        required: false
    }
}]
}, {timestamps: true});

module.exports = mongoose.model('user_profile', userDataSchema);
