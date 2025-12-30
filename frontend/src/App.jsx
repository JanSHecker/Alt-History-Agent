import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import IdeaInput from "./components/IdeaInput";
import EndpointInput from "./components/EndpointInput";
import DivergencePoints from "./components/DivergencePoints";
import Timeline from "./components/Timeline";
import Chapters from "./components/Chapters";

function App() {
  const location = useLocation();

  const getCurrentStage = () => {
    const path = location.pathname;
    if (path === "/idea") return "idea";
    if (path === "/endpoint") return "endpoint";
    if (path === "/divergence") return "divergence";
    if (path === "/timeline") return "timeline";
    if (path === "/chapters") return "chapters";
    return "idea";
  };

  const stage = getCurrentStage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Alt History Agent
          </h1>
          <p className="text-xl text-purple-200">
            Explore alternative timelines and reimagine history
          </p>
        </header>

        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center">
            {["Idea", "Endpoint", "Divergence", "Timeline", "Chapters"].map(
              (step, idx) => {
                const stages = [
                  "idea",
                  "endpoint",
                  "divergence",
                  "timeline",
                  "chapters",
                ];
                const currentIdx = stages.indexOf(stage);
                const isActive = idx <= currentIdx;

                return (
                  <div key={step} className="flex items-center flex-1">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${
                      isActive
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "bg-slate-800 border-slate-600 text-slate-400"
                    }`}
                    >
                      {idx + 1}
                    </div>
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        idx < 4
                          ? isActive
                            ? "bg-purple-600"
                            : "bg-slate-600"
                          : ""
                      }`}
                    />
                    <span
                      className={`absolute mt-14 text-sm ${
                        isActive ? "text-purple-300" : "text-slate-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/idea" />} />
            <Route path="/idea" element={<IdeaInput />} />
            <Route path="/endpoint" element={<EndpointInput />} />
            <Route path="/divergence" element={<DivergencePoints />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/chapters" element={<Chapters />} />
          </Routes>
        </div>

        {/* Reset Button */}
        {stage !== "idea" && (
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <button
              onClick={() => (window.location.href = "/idea")}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Start New Scenario
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
