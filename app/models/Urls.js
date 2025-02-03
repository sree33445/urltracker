import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  shortId: { type: String, unique: true },
  originalUrl: { type: String, required: true },
  clicks: [
    {
      timestamp: { type: Date, default: Date.now },
      ip: String,
      browser: String,
      device: String,
    },
  ],
});

const Urls = mongoose.models.Urls || mongoose.model("Urls", UrlSchema);
export default Urls;
