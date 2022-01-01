import App from '../src/components/App'
import { ethers } from 'ethers';
import { useState } from 'react';

export default function Home() {
  const [acctAddr, setAcctAddr] = useState();

  async function requestAccount() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const [acct] = await window.ethereum.request({ method: 'eth_accounts' });
      setAcctAddr(acct);
    } catch(err) {
      alert("Error getting acct: " + JSON.stringify(err));
    }
  }

  async function getBalance() {
    if (!acctAddr) {
      alert("No connected acct!");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(acctAddr);
    return balance;
  }

  let connectedAddrDisplay = <h3>No acct connected!</h3>;
  if (acctAddr) {
    connectedAddrDisplay = <h3>{acctAddr}</h3>;
  }

  return (
    <div>
      <App></App>
      {connectedAddrDisplay}
      <input type="button" onClick={requestAccount} value="Request Acct" />
      <input type="button" onClick={async () => {
        const balance = await getBalance();
        alert("Balance is: " + balance);
      }} value="Get balance" />
    </div>
  )
}
