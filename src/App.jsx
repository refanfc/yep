import React, { useEffect, useState } from 'react';

const YEP_TOKEN = "$YEP";
const FARCASTER_API = "https://api.farcaster.xyz/v2/casts";

export default function App() {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);

  // Fetch recent casts mentioning $YEP
  useEffect(() => {
    async function fetchCasts() {
      setLoading(true);
      try {
        // This example query fetches casts with $YEP in text (you can adjust)
        const res = await fetch(`${FARCASTER_API}?query=${encodeURIComponent(YEP_TOKEN)}`);
        const json = await res.json();
        setCasts(json.casts || []);
      } catch (err) {
        console.error("Failed fetching casts:", err);
      }
      setLoading(false);
    }
    fetchCasts();
  }, []);

  // Mock wallet connect and token balance fetch
  function connectWallet() {
    // TODO: Replace with WalletConnect or Magic.link integration
    setWalletConnected(true);
    // Mock token balance
    setTokenBalance(1234);
  }

  function tipUser(castId) {
    alert(`Pretend to tip $YEP tokens to cast ${castId}!`);
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>$YEP Mini App on Farcaster</h1>

      {!walletConnected ? (
        <button onClick={connectWallet} style={{ padding: '10px 20px', fontSize: 16 }}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p><b>Wallet Connected</b></p>
          <p>Token Balance: <b>{tokenBalance} $YEP</b></p>
        </div>
      )}

      <hr />

      <h2>Recent casts mentioning $YEP</h2>
      {loading ? (
        <p>Loading casts...</p>
      ) : casts.length === 0 ? (
        <p>No casts found mentioning $YEP.</p>
      ) : (
        casts.map((cast) => (
          <div key={cast.hash} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
            <p><b>@{cast.fid}</b>: {cast.text}</p>
            <button onClick={() => tipUser(cast.hash)} style={{ fontSize: 14, cursor: 'pointer' }}>
              Tip $YEP
            </button>
          </div>
        ))
      )}
    </div>
  );
}