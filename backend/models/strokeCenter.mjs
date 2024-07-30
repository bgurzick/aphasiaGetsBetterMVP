
import mongoose from 'mongoose';

const strokeCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  website: { type: String, required: true },
});

const strokeCenter = mongoose.model('certified_stroke_center', strokeCenterSchema);


export default strokeCenter;
