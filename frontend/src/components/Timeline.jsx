import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://host.docker.internal:8000/api";

export default function Timeline() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedTimeline, setEditedTimeline] = useState(null);
  const idea = location.state?.idea;
  const divergence = location.state?.selectedDivergence;

  // Removed useEffect to prevent automatic generation on page load

  const generateTimeline = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/timeline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea,
          selected_divergence: divergence,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate timeline");
      }

      const result = await response.json();
      setTimeline(result.timeline);
      setEditedTimeline(JSON.parse(JSON.stringify(result.timeline))); // Deep copy for editing
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEntry = (index) => {
    setEditingEntry(index);
  };

  const handleSaveEntry = (index) => {
    setTimeline([...editedTimeline]);
    setEditingEntry(null);
  };

  const handleCancelEdit = () => {
    setEditedTimeline(JSON.parse(JSON.stringify(timeline))); // Reset to original
    setEditingEntry(null);
  };

  const handleFieldChange = (index, field, value) => {
    const updated = [...editedTimeline];
    updated[index][field] = value;
    setEditedTimeline(updated);
  };

  const handleProceedToChapters = () => {
    navigate("/chapters", {
      state: {
        idea,
        divergenceData: location.state.divergenceData,
        selectedDivergence: divergence,
        timelineData: editedTimeline,
      },
    });
  };

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-purple-200 text-lg">
            Constructing alternative timeline...
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
            onClick={generateTimeline}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!timeline) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
        <div className="text-center py-12">
          <p className="text-purple-200 text-lg mb-4">
            Ready to generate an alternative timeline based on your idea and
            selected divergence point.
          </p>
          <button
            onClick={generateTimeline}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            disabled={loading}
          >
            Generate Timeline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-white mb-4">
        Alternative Timeline
      </h2>
      <p className="text-purple-200 mb-2">
        Based on divergence point:{" "}
        <span className="font-semibold">{divergence.title}</span>
      </p>
      <p className="text-purple-200 mb-6">
        Review and edit the timeline below. Make any changes you want before
        proceeding to generate narrative chapters.
      </p>

      <div className="mt-8 relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-600"></div>

        {/* Timeline entries */}
        <div className="space-y-8">
          {editedTimeline &&
            editedTimeline.map((entry, idx) => (
              <div key={idx} className="relative pl-20">
                {/* Timeline dot */}
                <div className="absolute left-6 w-5 h-5 rounded-full bg-purple-600 border-4 border-slate-800"></div>

                {/* Content */}
                <div className="bg-slate-700 rounded-lg p-4">
                  {editingEntry === idx ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-purple-300 mb-1">
                          Date
                        </label>
                        <input
                          type="text"
                          value={entry.date}
                          onChange={(e) =>
                            handleFieldChange(idx, "date", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-purple-300 mb-1">
                          Event Title
                        </label>
                        <input
                          type="text"
                          value={entry.event}
                          onChange={(e) =>
                            handleFieldChange(idx, "event", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-purple-300 mb-1">
                          Description
                        </label>
                        <textarea
                          value={entry.description}
                          onChange={(e) =>
                            handleFieldChange(
                              idx,
                              "description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSaveEntry(idx)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {entry.event}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-300 text-sm font-mono whitespace-nowrap">
                            {entry.date}
                          </span>
                          <button
                            onClick={() => handleEditEntry(idx)}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <p className="text-purple-100">{entry.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={generateTimeline}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          disabled={loading}
        >
          {loading ? "Regenerating..." : "Regenerate Timeline"}
        </button>
        <button
          onClick={handleProceedToChapters}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Proceed to Chapters
        </button>
      </div>
    </div>
  );
}
