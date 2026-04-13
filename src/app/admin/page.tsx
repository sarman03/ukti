"use client";

import { useState } from "react";
import SectionImageManager from "./SectionImageManager";

const ADMIN_EMAIL = "admin@ukti.in";
const ADMIN_PASSWORD = "ukti@2026";

const sections = [
  {
    folder: "hero",
    title: "Hero Section",
    aspect: 16 / 9,
    aspectLabel: "Hero — 16:9 full screen",
  },
  {
    folder: "about",
    title: "About Us",
    aspect: 5 / 4,
    aspectLabel: "About — 5:4",
    maxImages: 2,
  },
  {
    folder: "why-choose",
    title: "Why Choose Ukti (Puzzle Images)",
    aspect: 11 / 10,
    aspectLabel: "Puzzle — 11:10",
    maxImages: 6,
  },
  {
    folder: "classroom",
    title: "Our Classroom",
    aspect: 16 / 9,
    aspectLabel: "Classroom card — 16:9",
    maxImages: 5,
  },
  {
    folder: "classroom-hero",
    title: "Classroom Page — Hero Banner",
    aspect: 16 / 9,
    aspectLabel: "Classroom Hero — 16:9 full screen",
  },
  {
    folder: "classroom-cards",
    title: "Classroom Page — Program Cards",
    aspect: 4 / 3,
    aspectLabel: "Program Card — 4:3",
    maxImages: 5,
  },
  {
    folder: "gallery",
    title: "Gallery",
    aspect: 1,
    aspectLabel: "Gallery — 1:1 square",
  },
  {
    folder: "learning-goals",
    title: "Learning Goals",
    aspect: 1,
    aspectLabel: "Learning Goals — 1:1 square",
    maxImages: 2,
  },
  {
    folder: "testimonials",
    title: "Testimonials",
    aspect: 1,
    aspectLabel: "Testimonial — 1:1 square",
  },
  {
    folder: "cta",
    title: "Growing Section (CTA)",
    aspect: 4 / 3,
    aspectLabel: "CTA — 4:3",
    maxImages: 3,
  },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setError("Invalid email or password");
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter password"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Ukti Admin Panel
          </h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-4">
        {sections.map((s) => (
          <SectionImageManager key={s.folder} {...s} />
        ))}
      </main>
    </div>
  );
}
