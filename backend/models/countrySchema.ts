import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for Country Document
interface ICountry extends Document {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: number;
  phone_code: number;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: number;
  subregion: string;
  subregion_id: number;
  nationality: string;
  timezones: string; // Consider using an array of objects for better structure
  latitude: number;
  longitude: number;
  emoji: string;
  emojiU: string;
}

// Define the schema
const CountrySchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  iso3: { type: String, required: true },
  iso2: { type: String, required: true },
  numeric_code: { type: Number, required: true },
  phone_code: { type: Number, required: true },
  capital: { type: String, required: true },
  currency: { type: String, required: true },
  currency_name: { type: String, required: true },
  currency_symbol: { type: String, required: true },
  tld: { type: String, required: true },
  native: { type: String, required: true },
  region: { type: String, required: true },
  region_id: { type: Number, required: true },
  subregion: { type: String, required: true },
  subregion_id: { type: Number, required: true },
  nationality: { type: String, required: true },
  timezones: { type: String, required: true }, // Better to use: { type: [Object], required: true }
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  emoji: { type: String, required: true },
  emojiU: { type: String, required: true },
});

// Export the model
const Country = mongoose.model<ICountry>('country', CountrySchema);
export default Country;
