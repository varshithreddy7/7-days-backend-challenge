import mongoose from "mongoose";
const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, 'Original URL is required!'],
      trim: true,
      index: true,
      validate: {
        validator: (value) =>{
          try{
            const parsed = new URL(value);
            return['http:', 'https:'].includes(parsed.protocol);
          }catch(error){
            return false;
          }
        },
        message: 'Please provide a valid HTTP/HTTPS URL',
      }
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0
    },
  },
  {timestamps: true}
);

const Url = mongoose.model('Url', urlSchema);
export default Url;