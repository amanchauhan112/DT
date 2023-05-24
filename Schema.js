const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = new Schema({
  name: {
    type: String,
    requied: true,
  },
  tagline: {
    type: String,
    requied: true,
  },
  schedule: {
    type: Date,
    default: Date.now().getTime,
  },
  schedule: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000)
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    requied: true,
  },
  moderator: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
    required: true,
  },
  rigor_rank: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  }
}
);

const EventModel = new mongoose.model('Events', Event);
module.exports = EventModel;