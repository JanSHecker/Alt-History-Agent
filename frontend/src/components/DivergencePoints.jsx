import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://host.docker.internal:8000/api";

export default function DivergencePoints() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const idea = location.state?.idea;
  const endpoint = location.state?.endpoint;

  useEffect(() => {
    if (idea) {
      generateDivergencePoints();
    } else {
      setLoading(false);
      setError("No idea provided. Please go back and enter an idea.");
    }
  }, [idea]);

  const generateDivergencePoints = async () => {
    console.log(
      "[FRONTEND DEBUG] generateDivergencePoints called with idea:",
      idea,
      "endpoint:",
      endpoint
    );
    try {
      setLoading(true);
      setError(null);

      console.log(
        "[FRONTEND DEBUG] Fetching from:",
        `${API_URL}/divergence-points`
      );
      const response = await fetch(`${API_URL}/divergence-points`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea, endpoint }),
      });

      console.log("[FRONTEND DEBUG] Response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to generate divergence points");
      }

      const result = await response.json();
      console.log("[FRONTEND DEBUG] Response data:", result);
      setData(result);
    } catch (err) {
      console.error("[FRONTEND DEBUG] Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (divergencePoint) => {
    setSelectedId(divergencePoint.id);
    navigate("/timeline", {
      state: {
        idea,
        endpoint,
        divergenceData: data,
        selectedDivergence: divergencePoint,
      },
    });
  };

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-purple-200 text-lg">
            Analyzing historical possibilities...
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
            onClick={generateDivergencePoints}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
        <div className="text-center py-12">
          <p className="text-purple-200 text-lg mb-4">
            Generating divergence points for your idea...
          </p>
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-white mb-2">{data.event_name}</h2>
      <p className="text-purple-200 mb-6">{data.context}</p>

      <h3 className="text-xl font-semibold text-white mb-4">
        Select a Divergence Point:
      </h3>

      <div className="mb-4">
        <button
          onClick={generateDivergencePoints}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          disabled={loading}
        >
          {loading ? "Regenerating..." : "Reload Divergence Points"}
        </button>
      </div>

      <div className="space-y-4">
        {data.divergence_points.map((point) => (
          <div
            key={point.id}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedId === point.id
                ? "border-purple-500 bg-slate-700"
                : "border-slate-600 bg-slate-750 hover:border-purple-400"
            }`}
            onClick={() => handleSelect(point)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-lg font-semibold text-white">
                {point.title}
              </h4>
              <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                {Math.round(point.plausibility_score * 100)}% plausible
              </span>
            </div>
            <p className="text-purple-100">{point.description}</p>
          </div>
        ))}
      </div>

      {selectedId && (
        <div className="mt-6 text-center">
          <p className="text-purple-200 mb-3">
            Click the selected divergence point again to continue
          </p>
        </div>
      )}
    </div>
  );
}
