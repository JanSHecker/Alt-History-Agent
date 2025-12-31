import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://host.docker.internal:8000/api";

export default function EndpointInput() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedEndpoints, setGeneratedEndpoints] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [customEndpoint, setCustomEndpoint] = useState("");
  const [timeHorizon, setTimeHorizon] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const idea = location.state?.idea;
  const endpoint = location.state?.endpoint;
  const divergenceData = location.state?.divergenceData;
  const selectedDivergence = location.state?.selectedDivergence;

  const generateEndpoints = async () => {
    console.log(
      "[FRONTEND DEBUG] generateEndpoints called with idea:",
      idea,
      "timeHorizon:",
      timeHorizon
    );
    try {
      setLoading(true);
      setError(null);

      console.log("[FRONTEND DEBUG] Fetching from:", `${API_URL}/endpoints`);
      const response = await fetch(`${API_URL}/endpoints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea,
          time_horizon: timeHorizon ? parseInt(timeHorizon) : undefined,
        }),
      });

      console.log("[FRONTEND DEBUG] Response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to generate endpoints");
      }

      const data = await response.json();
      console.log("[FRONTEND DEBUG] Endpoints data:", data);
      setGeneratedEndpoints(data.endpoints);
    } catch (err) {
      console.error("[FRONTEND DEBUG] Error generating endpoints:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const finalEndpoint = selectedEndpoint || customEndpoint.trim() || endpoint || null;
    console.log(
      "[FRONTEND DEBUG] Navigating to /timeline with idea:",
      idea,
      "endpoint:",
      finalEndpoint
    );
    navigate("/timeline", { 
      state: { 
        idea, 
        endpoint: finalEndpoint,
        divergenceData,
        selectedDivergence
      } 
    });
  };

  const handleSkip = () => {
    console.log(
      "[FRONTEND DEBUG] Skipping endpoint, navigating to /timeline with idea:",
      idea
    );
    navigate("/timeline", { 
      state: { 
        idea, 
        endpoint: endpoint || null,
        divergenceData,
        selectedDivergence
      } 
    });
  };

  if (!idea || !selectedDivergence) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
        <p className="text-red-400">
          Missing required data. Please go back and select a divergence point.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-white mb-4">
        Refine Desired Endpoint (Optional)
      </h2>
      <p className="text-purple-200 mb-6">
        Based on your selected divergence point "{selectedDivergence?.title}", you can optionally define where you want this alternative history scenario to end up. This helps guide the timeline generation toward your desired outcome.
      </p>

      <div className="space-y-6">
        {/* Time Horizon Input */}
        <div>
          <label
            className="block text-sm text-slate-400 mb-2"
            htmlFor="time-horizon"
          >
            Time Horizon (years, optional)
          </label>
          <input
            id="time-horizon"
            type="number"
            min="1"
            value={timeHorizon}
            onChange={(e) =>
              setTimeHorizon(e.target.value.replace(/[^0-9]/g, ""))
            }
            placeholder="e.g. 50"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        {/* Generate Endpoints Button */}
        <div>
          <button
            onClick={generateEndpoints}
            disabled={loading}
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {loading ? "Generating..." : "Generate 5 Possible Endpoints"}
          </button>
        </div>

        {/* Generated Endpoints */}
        {generatedEndpoints.length > 0 && (
          <div>
            <p className="text-sm text-slate-400 mb-3">
              Select a generated endpoint:
            </p>
            <div className="space-y-2">
              {generatedEndpoints.map((endpoint, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedEndpoint(endpoint);
                    setCustomEndpoint("");
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedEndpoint === endpoint
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "bg-slate-700 border-slate-600 text-purple-200 hover:bg-slate-600"
                  }`}
                >
                  {endpoint}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Endpoint */}
        <div>
          <p className="text-sm text-slate-400 mb-3">
            Or write your own endpoint:
          </p>
          <textarea
            value={customEndpoint}
            onChange={(e) => {
              setCustomEndpoint(e.target.value);
              setSelectedEndpoint("");
            }}
            placeholder="Describe the desired outcome of your alternative history scenario..."
            className="w-full h-24 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-900 border border-red-700 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSkip}
            className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg transition-colors"
          >
            Skip (Leave Open)
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedEndpoint && !customEndpoint.trim()}
            className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            Generate Timeline
          </button>
        </div>
      </div>
    </div>
  );
}
