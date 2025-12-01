import { useEffect, useState, useCallback } from "react";

function formatLocal(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch (e) {
    return iso;
  }
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/hello");
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      setMessage(data.message ?? "(no message)");
      setTimestamp(data.timestamp ?? null);
    } catch (err) {
      setError(err.message || "Failed to fetch");
      setMessage("");
      setTimestamp(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessage();
  }, [fetchMessage]);

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system", padding: 24 }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 4 }}>Simple Next.js App</h1>
        <p style={{ marginTop: 0, color: "#555" }}>
          This page fetches a message from a local API route. Click Refresh to
          update.
        </p>

        <div
          style={{
            marginTop: 18,
            padding: 16,
            border: "1px solid #eee",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>API message</strong>
            <div>
              <button
                onClick={fetchMessage}
                disabled={loading}
                style={{ padding: "6px 10px", borderRadius: 6 }}
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>

          <div style={{ marginTop: 12, minHeight: 40 }}>
            {error ? (
              <div style={{ color: "#a00" }}>Error: {error}</div>
            ) : (
              <div style={{ color: "#111" }}>
                {message || "(no message yet)"}
              </div>
            )}
          </div>

          <div style={{ marginTop: 10, color: "#666", fontSize: 13 }}>
            {timestamp ? (
              <span>Last fetched: {formatLocal(timestamp)}</span>
            ) : (
              <span>Not fetched yet</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
