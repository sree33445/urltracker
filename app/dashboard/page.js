import { connectToDatabase } from "../lib/mongodb";
import Urls from "../models/Urls";
import UserAgentParser from "../components/UserAgentParser";

export default async function AnalyticsPage() {
  await connectToDatabase();
  const urls = await Urls.find({});

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Visitor Analytics
        </h1>
        
        <div className="space-y-8">
          {urls.map((url) => (
            <div 
              key={url._id} 
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                Short URL: <span className="text-blue-600">{url.shortId}</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {url.clicks.map((click, index) => (
                  <div key={index} className="flex-1">
                    <UserAgentParser userAgent={click.userAgent} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}