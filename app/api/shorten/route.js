import { connectToDatabase } from "@/app/lib/mongodb";
import Urls from "@/app/models/Urls";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { originalUrl } = await req.json();

    if (!originalUrl) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
      });
    }

    const shortId = nanoid(8);
    const newUrl = await Urls.create({ shortId, originalUrl });

    return new Response(
      JSON.stringify({ shortUrl: `${process.env.BASE_URL}/${shortId}` })
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
