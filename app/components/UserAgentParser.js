"use client";
import { useEffect, useState } from "react";

export default function UserAgentParser({ userAgent }) {
  const [browserInfo, setBrowserInfo] = useState({
    browser: "Unknown",
    os: "Unknown",
    device: "Desktop"
  });

  useEffect(() => {
    if (userAgent) {
      // Parse browser
      const browserRegex = {
        'Chrome': /Chrome\/([0-9.]+)/,
        'Firefox': /Firefox\/([0-9.]+)/,
        'Safari': /Safari\/([0-9.]+)/,
        'Edge': /Edg\/([0-9.]+)/,
        'Opera': /OPR\/([0-9.]+)/
      };

      // Parse OS
      const osRegex = {
        'Windows': /Windows NT/,
        'Mac': /Macintosh/,
        'iOS': /iPhone|iPad|iPod/,
        'Android': /Android/,
        'Linux': /Linux/
      };

      // Detect browser
      let detectedBrowser = "Unknown";
      for (const [browser, regex] of Object.entries(browserRegex)) {
        if (regex.test(userAgent)) {
          detectedBrowser = browser;
          break;
        }
      }

      // Detect OS
      let detectedOS = "Unknown";
      for (const [os, regex] of Object.entries(osRegex)) {
        if (regex.test(userAgent)) {
          detectedOS = os;
          break;
        }
      }

      // Detect device type
      let detectedDevice = "Desktop";
      if (/Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)) {
        detectedDevice = "Mobile";
      } else if (/Tablet|iPad/i.test(userAgent)) {
        detectedDevice = "Tablet";
      }

      setBrowserInfo({
        browser: detectedBrowser,
        os: detectedOS,
        device: detectedDevice
      });
    }
  }, [userAgent]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Device Information
      </h2>
      <div className="space-y-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-4">
            🌐
          </div>
          <div>
            <p className="text-sm text-gray-500">Browser</p>
            <p className="font-medium text-gray-900">
              {browserInfo.browser}
            </p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full mr-4">
            💻
          </div>
          <div>
            <p className="text-sm text-gray-500">Operating System</p>
            <p className="font-medium text-gray-900">
              {browserInfo.os}
            </p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-full mr-4">
            📱
          </div>
          <div>
            <p className="text-sm text-gray-500">Device Type</p>
            <p className="font-medium text-gray-900">
              {browserInfo.device}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}