import { useState } from "react";
import { useLocation } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://host.docker.internal:8000/api";

export default function Chapters() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapters, setChapters] = useState([]);
  const location = useLocation();
  const idea = location.state?.idea;
  const divergence = location.state?.selectedDivergence;
  const timeline = location.state?.timelineData;

  // Removed useEffect to prevent automatic generation on page load

  const generateChapters = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea,
          divergence_point: divergence,
          timeline,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate chapters");
      }

      const result = await response.json();
      setChapters(result.chapters);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-purple-200 text-lg">
            Writing narrative chapters...
          </p>
          <p className="text-purple-300 text-sm mt-2">
            This may take a minute...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
        <div className="text-center py-12">
          <p className="text-red-400 text-lg mb-4">Error: {error}</p>
          <button
            onClick={generateChapters}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!chapters || chapters.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
        <div className="text-center py-12">
          <p className="text-purple-200 text-lg mb-4">
            Ready to generate narrative chapters based on your timeline.
          </p>
          <button
            onClick={generateChapters}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            disabled={loading}
          >
            Generate Chapters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Alternative History Narrative
        </h2>
        <p className="text-purple-200">
          Based on: <span className="font-semibold">{divergence.title}</span>
        </p>
      </div>

      {chapters.map((chapter) => (
        <div
          key={chapter.number}
          className="bg-slate-800 rounded-lg shadow-2xl p-8"
        >
          <div className="mb-4">
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">
              Chapter {chapter.number}
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-2">
              {chapter.title}
            </h3>
            <p className="text-purple-300 text-sm">{chapter.time_period}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            {chapter.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-purple-100 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-slate-800 rounded-lg shadow-2xl p-8 text-center">
        <p className="text-purple-200 text-lg mb-4">
          ✨ Your alternative history scenario is complete! ✨
        </p>
        <p className="text-purple-300 text-sm">
          {chapters.length} chapters • Based on {timeline.length} timeline
          events
        </p>
      </div>
    </div>
  );
}
