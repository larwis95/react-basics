import React, { useEffect, useRef, useState } from "react";
import CryptoForm from "./CryptoForm";
import CryptoCard from "./CryptoCard";

type CoinGeckoResult = {
  name: string;
  symbol: string;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    ath: { usd: number };
    low_24h: { usd: number };
    high_24h: { usd: number };
    total_volume: { usd: number };
  };
  description: { en: string };
  links: { homepage: string[] };
};

const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

function CryptoInfo() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CoinGeckoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastQueryRef = useRef<string | null>(null);

  useEffect(() => {
    // On mount: load from localStorage
    if (result === null) {
      const saved = localStorage.getItem("cryptoInfo");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);
        lastQueryRef.current = parsed.id || parsed.name?.toLowerCase() || "";
      }
    } else {
      // On result change: save to localStorage
      localStorage.setItem("cryptoInfo", JSON.stringify(result));
    }
  }, [result]);

  // Auto-refresh effect: refresh every 60 seconds if result and query match
  useEffect(() => {
    if (!result || !lastQueryRef.current) return;

    const interval = setInterval(() => {
      console.log("Updating data for: ", lastQueryRef.current);
      fetchCoin(lastQueryRef.current!, false);
    }, 60000);

    return () => clearInterval(interval);
  }, [result, query]);

  const fetchCoin = async (search: string, showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const url = `https://api.coingecko.com/api/v3/coins/${search}`;
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setResult(data);
      localStorage.setItem("cryptoInfo", JSON.stringify(data));
    } catch {
      setError("Not found");
      setResult(null);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const search = query.trim().toLowerCase();
    if (!search) return;
    lastQueryRef.current = search;
    fetchCoin(search);
  };

  return (
    <div className="crypto-info">
      <h2>Crypto Info</h2>
      <CryptoForm
        query={query}
        setQuery={setQuery}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <div className="result-container">
        <div className="crypto-card">
          {loading && <p className="crypto-loading">Loading...</p>}
          {error && !loading && <p className="crypto-error">{error}</p>}
          {result && !error && !loading && (
            <CryptoCard result={result} formatUSD={formatUSD} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CryptoInfo;