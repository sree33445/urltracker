import { connectToDatabase } from "../lib/mongodb";
import Urls from "../models/Urls";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  const { shortId } = params;
  await connectToDatabase();

  const url = await Urls.findOne({ shortId });
  if (!url) return <h1>404 - Not Found</h1>;

  // Get user-agent and IP address
  const userAgent = headers().get("user-agent") || "Unknown";
  const ip = headers().get("x-forwarded-for") || "Unknown";

  // Save raw data in database
  url.clicks.push({ ip, userAgent });
  await url.save();

  // Redirect user
  redirect(url.originalUrl);
}
