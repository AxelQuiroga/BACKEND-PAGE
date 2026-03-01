import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength:2
  },
  email: {
    type: String,
    required: true,
    trim: true,
     match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  number: {
    type: String,
    required: true,
    trim: true,
     match: [/^\d+$/, "El número solo debe contener dígitos"]
  },
  status: {type:String,enum: ["new","read","replied"],default: "new"},
},{timestamps:true});

export default mongoose.model("Contact",contactSchema)