import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for State Document
interface IState extends Document {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  state_code: string;
  latitude: number;
  longitude: number;
}

// Define the schema
const StateSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  country_id: { type: Number, required: true },
  country_code: { type: String, required: true },
  country_name: { type: String, required: true },
  state_code: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

// Export the model
const State = mongoose.model<IState>('state', StateSchema);
export default State;
