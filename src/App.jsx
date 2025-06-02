import React, { useState } from "react";
import Web3 from "web3";

export default function App() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      const WalletConnectProvider = (await import("@walletconnect/web3-provider")).default;

      const provider = new WalletConnectProvider({
        rpc: {
          8453: "https://mainnet.base.org", // Base mainnet RPC
        },
        chainId: 8453,
      });

      await provider.enable();
      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      provider.on("disconnect", () => {
        setAccount(null);
      });
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Yep Mini App - WalletConnect</h2>
      {account ? (
        <p>Connected: <b>{account}</b></p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
