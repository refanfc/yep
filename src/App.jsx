import React, { useState, useEffect } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

export default function App() {
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      const walletConnectProvider = new WalletConnectProvider({
        rpc: {
          8453: "https://mainnet.base.org", // Base mainnet RPC
        },
        chainId: 8453,
      });

      await walletConnectProvider.enable();

      const web3Instance = new Web3(walletConnectProvider);
      setProvider(walletConnectProvider);
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);

      walletConnectProvider.on("disconnect", () => {
        setAccount(null);
        setProvider(null);
        setWeb3(null);
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Yep Mini App - WalletConnect (Base Chain)</h2>
      {account ? (
        <p>Connected wallet: <b>{account}</b></p>
      ) : (
        <button
          onClick={connectWallet}
          style={{ padding: "10px 15px", cursor: "pointer" }}
        >
          Connect Wallet with WalletConnect
        </button>
      )}
    </div>
  );
}
