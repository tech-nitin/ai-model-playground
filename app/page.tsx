"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [model, setModel] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  const handleGenerate = async () => {
  if (!model) {
    setError("Please select a model first");
    return;
  }

  if (!prompt) {
    setError("Please enter a prompt");
    return;
  }

  setError("");
  setLoading(true);
  setResponse("");

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, model }),
    });

    const data = await res.json();

    setResponse(data.result);
  } catch (err) {
    setError("Failed to fetch AI response");
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        dark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200"
      }`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-sm shadow ${
          dark
            ? "bg-white text-black"
            : "bg-black text-white"
        }`}
      >
        {dark ? "Light" : "Dark"}
      </button>

      {/* Card */}
      <div
        className={`w-[420px] p-6 rounded-2xl space-y-4 shadow-2xl border transition-all duration-300 hover:scale-[1.02] animate-fadeIn ${
          dark
            ? "bg-white/10 border-white/20 backdrop-blur-lg text-white"
            : "bg-white/70 border-white/30 backdrop-blur-lg text-gray-800"
        }`}
      >
        {/* Title */}
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold mb-2">
          <Sparkles className="text-purple-500" />
          AI Model Playground
        </h1>

        {/* Empty State */}
        {!response && !loading && (
          <p className="text-sm text-center opacity-70">
            Select a model and enter a prompt to generate response
          </p>
        )}

        {/* Model Selector */}
        <select
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-black"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="">Select Model</option>
          <option value="GPT-4">GPT-4</option>
          <option value="Claude">Claude</option>
          <option value="Gemini">Gemini</option>
        </select>

        {/* Model Description */}
        {model && (
          <p className="text-xs text-center opacity-70">
            {model === "GPT-4" && "Best for reasoning and coding"}
            {model === "Claude" && "Great for long text and analysis"}
            {model === "Gemini" && "Fast and multimodal AI"}
          </p>
        )}

        {/* Input */}
        <input
          disabled={loading}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-black"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleGenerate}
          disabled={!model || loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition ${
            !model || loading
              ? "bg-gray-400 cursor-not-allowed opacity-70"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 hover:shadow-lg"
          }`}
        >
          {loading ? "Thinking..." : "Generate"}
        </button>

        {/* Error */}
        {error && (
          <div className="bg-red-200 text-red-700 p-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 p-3 rounded-xl text-sm text-center shadow">
              {response}
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(response)}
              className="text-xs text-purple-500 hover:underline"
            >
              Copy response
            </button>
          </div>
        )}
      </div>
    </div>
  );
}