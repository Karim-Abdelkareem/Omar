import React, { useState } from "react";
import { User, DollarSign, MapPin, Mail, Tag, Award } from "lucide-react";

export default function MyEarnings() {
  // Since we can't use axios in this environment, I'll use mock data
  // that matches the structure you provided
  const [earningsData] = useState({
    earnings: 420.0,
    agent: {
      id: 1,
      user: {
        id: 1,
        username: "Karamelaz",
        email: "alkar33m@gmail.com",
        role: "",
      },
      city: "Sohag",
      total_earnings: 420.0,
    },
  });

  // In your actual app, you'd use this code to fetch data:
  /*
  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/agents/earnings`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        const data = await response.json();
        setEarningsData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch earnings data");
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);
  */

  const { agent } = earningsData;
  const { user, city, total_earnings } = agent;

  // Get first letter of username for avatar
  const avatarInitial = user.username.charAt(0).toUpperCase();

  return (
    <div className="w-full my-6 max-w-md mx-auto bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg overflow-hidden md:max-w-2xl border border-blue-100">
      {/* Header with gradient background */}
      <div className="bg-teal-600 p-6 text-white">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white text-blue-600 font-bold text-2xl shadow-md">
            {avatarInitial}
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <div className="flex items-center mt-1 text-blue-100">
              <Mail className="h-4 w-4 mr-1" />
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User details */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
            <Tag className="h-5 w-5 text-blue-500" />
            <div className="ml-3 flex-grow">
              <p className="text-xs text-gray-500 uppercase font-semibold">
                User ID
              </p>
              <p className="font-medium text-gray-800">{user.id}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
            <Award className="h-5 w-5 text-blue-500" />
            <div className="ml-3 flex-grow">
              <p className="text-xs text-gray-500 uppercase font-semibold">
                Role
              </p>
              <p className="font-medium text-gray-800">
                {user.role || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
            <MapPin className="h-5 w-5 text-blue-500" />
            <div className="ml-3 flex-grow">
              <p className="text-xs text-gray-500 uppercase font-semibold">
                City
              </p>
              <p className="font-medium text-gray-800">{city}</p>
            </div>
          </div>
        </div>

        {/* Earnings section */}
        <div className="mt-6 bg-white p-5 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="ml-2 text-lg font-semibold text-gray-900">
              Earnings Summary
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 uppercase font-semibold">
                Total
              </p>
              <p className="text-xl font-bold text-green-600">
                ${total_earnings.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
