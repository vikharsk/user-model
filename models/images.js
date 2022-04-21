const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFileDataSchema = new Schema({
  user_id: {
      type: mongoose.Types.ObjectId,
      require: false
  },

    file_name: {
        type: String,
        required: false
    },
    short_code: {
        type: String,
        required: false
    },
    post_fix_no:{
        type: Number,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('user_file', userFileDataSchema);
