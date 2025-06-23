import React from "react";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

export default function CryptoForm({ query, setQuery, loading, handleSubmit }: Props) {
  return (
    <form className="crypto-form" onSubmit={handleSubmit}>
      <input
        className="crypto-input"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter cryptocurrency name (e.g., 'bitcoin' or 'ethereum')"
      />
      <button className="crypto-btn" type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}