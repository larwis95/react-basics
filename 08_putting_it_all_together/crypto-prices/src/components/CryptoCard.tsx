type Props = {
  result: {
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
  formatUSD: (n: number) => string;
};

export default function CryptoCard({ result, formatUSD }: Props) {
  return (
    <>
      <h3>
        {result.name} <span className="symbol">({result.symbol.toUpperCase()})</span>
      </h3>
      <div className="crypto-stats">
        <div className="crypto-stats-row">
          <div>
            <span className="label">Price:</span>
            <span>{formatUSD(result.market_data.current_price.usd)}</span>
          </div>
          <div>
            <span className="label">ATH:</span>
            <span>{formatUSD(result.market_data.ath.usd)}</span>
          </div>
          <div>
            <span className="label">Market Cap:</span>
            <span>{formatUSD(result.market_data.market_cap.usd)}</span>
          </div>
        </div>
        <div className="crypto-stats-row">
          <div>
            <span className="label">24h Low:</span>
            <span>{formatUSD(result.market_data.low_24h.usd)}</span>
          </div>
          <div>
            <span className="label">24h High:</span>
            <span>{formatUSD(result.market_data.high_24h.usd)}</span>
          </div>
          <div>
            <span className="label">24h Volume:</span>
            <span>{formatUSD(result.market_data.total_volume.usd)}</span>
          </div>
        </div>
      </div>
      <h4>Description:</h4>
      <p className="indented">{result.description.en}</p>
      <a
        className="crypto-link"
        href={result.links.homepage[0]}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit {result.name}'s Homepage
      </a>
    </>
  );
}