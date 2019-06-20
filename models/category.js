var mongoose = require("mongoose");
var category = new mongoose.Schema({
  title: {type: String, required: '{PATH} is required.',  unique: true},
  description: {type: String, required: '{PATH} is required.',  unique: true},
  subCats :  [ {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    title: {type: String, required: '{PATH} is required.'},
    description: {type: String, required: '{PATH} is required.'},
    items: [String],
    createdOn: {type: Date, default: Date.now},
             } ],
  createdOn: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Category',category);