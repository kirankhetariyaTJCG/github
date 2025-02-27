import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for City Document
interface ICity extends Document {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: number;
  longitude: number;
  wikiDataId: string;
}

// Define the schema
const CitySchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  state_id: { type: Number, required: true },
  state_code: { type: String, required: true },
  state_name: { type: String, required: true },
  country_id: { type: Number, required: true },
  country_code: { type: String, required: true },
  country_name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  wikiDataId: { type: String, required: false }, // Optional field
});

// Export the model
const City = mongoose.model<ICity>('city', CitySchema);
export default City;
