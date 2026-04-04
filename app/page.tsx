"use client";

import { useState } from "react";

export default function Home() {
  const [model, setModel] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = () => {
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

    setTimeout(() => {
      setLoading(false);
      setResponse(`Response from ${model}: "${prompt}"`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-6 rounded-xl shadow-lg border w-[400px] space-y-4 transition hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-black to-gray-600 text-transparent bg-clip-text">
  AI Model Playground
</h1>

        {!response && !loading && (
          <p className="text-gray-500 text-sm text-center">
            Select a model and enter a prompt to generate response
          </p>
        )}

        {/* Model Selector */}
        <select
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="">Select Model</option>
          <option value="GPT-4">GPT-4</option>
          <option value="Claude">Claude</option>
          <option value="Gemini">Gemini</option>
        </select>

        {/* Input */}
        <input
          disabled={loading}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleGenerate}
          disabled={!model || loading}
          className={`w-full py-2 rounded-lg text-white font-medium transition transform ${
            !model || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-900 hover:scale-105"
          }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        {/* Error */}
        {error && (
          <div className="bg-red-200 text-red-700 p-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="bg-green-100 text-green-800 p-2 rounded text-sm text-center">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}
