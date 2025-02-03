"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl("");

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    });

    const data = await res.json();
    if (res.ok) {
      setShortUrl(data.shortUrl);
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
          <button className="w-full bg-blue-600 text-white font-medium py-2 rounded-md">
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-4">
            <p className="text-black">Shortened URL:</p>
            <a href={shortUrl} target="_blank" className="text-blue-500 underline">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
