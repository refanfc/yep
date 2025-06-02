import React, { useEffect, useState } from "react";

export default function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wallet = params.get("wallet_address");
    if (wallet) {
      setWalletAddress(wallet);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  function handleConnect() {
    const redirectUri = encodeURIComponent(window.location.origin + "/");
    const dynamicConnectUrl = `https://dynamic.xyz/connect?app=Yep&redirect_uri=${redirectUri}`;
    window.location.href = dynamicConnectUrl;
  }

  function handleSignMessage() {
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }
    const message = "I agree to sign this message in Yep Mini App";
    const redirectUri = encodeURIComponent(window.location.origin + "/sign-callback");
    const signUrl = `https://dynamic.xyz/sign?message=${encodeURIComponent(message)}&redirect_uri=${redirectUri}`;
    window.location.href = signUrl;
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Yep Mini App</h2>
      {walletAddress ? (
        <>
          <p>Wallet connected: <b>{walletAddress}</b></p>
          <button onClick={handleSignMessage} style={{ padding: "10px 15px", cursor: "pointer" }}>
            Sign Message (example)
          </button>
        </>
      ) : (
        <button onClick={handleConnect} style={{ padding: "10px 15px", cursor: "pointer" }}>
          Connect Wallet via Dynamic.xyz
        </button>
      )}
    </div>
  );
}
