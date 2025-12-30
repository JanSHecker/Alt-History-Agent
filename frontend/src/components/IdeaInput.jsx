import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IdeaInput() {
  const [idea, setIdea] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "[FRONTEND DEBUG] IdeaInput handleSubmit called with idea:",
      idea
    );
    if (idea.trim()) {
      console.log(
        "[FRONTEND DEBUG] Navigating to /endpoint with idea:",
        idea.trim()
      );
      navigate("/endpoint", { state: { idea: idea.trim() } });
    } else {
      console.log("[FRONTEND DEBUG] Idea is empty, not navigating");
    }
  };

  const examples = [
    "What if Napoleon won at Waterloo?",
    "What if the Library of Alexandria was never destroyed?",
    "What if the Cuban Missile Crisis escalated to war?",
    "What if the Roman Empire never fell?",
  ];

  return (
    <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-white mb-4">
        What historical sceanrio would you like to explore?
      </h2>
      <p className="text-purple-200 mb-6">
        Enter your alternative history idea below. Be specific about the
        historical event you want to explore.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Example: What if Napoleon won at Waterloo?"
          className="w-full h-32 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          required
        />

        <button
          type="submit"
          disabled={!idea.trim()}
          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          Define Endpoint
        </button>
      </form>

      <div className="mt-8">
        <p className="text-sm text-slate-400 mb-3">Try these examples:</p>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setIdea(example)}
              className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 text-purple-200 rounded-full transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
