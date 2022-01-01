import { ethers } from 'ethers';
import { useState } from 'react';
import Vault from "../../artifacts/contracts/Vault.sol/Vault.json";
import ErrorPopup from '../ErrorPopup';
import { CustomMessageProvider } from '../ErrorPopup/context';
import useMsg from '../ErrorPopup/hook';

const vaultAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function App() {
  const [acctAddr, setAcctAddr] = useState();
  const [vaultKey, setVaultKey] = useState();
  const [vaultValue, setVaultValue] = useState();
  const { setMsg } = useMsg();

  async function requestAccount() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const [acct] = await window.ethereum.request({ method: 'eth_accounts' });
      setAcctAddr(acct);
    } catch (err) {
      alert("Error getting acct: " + JSON.stringify(err));
    }
  }

  async function retrieveVaultItem(key) {
    // TODO: Try to handle this globally
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(vaultAddress, Vault.abi, provider);

      try {
        return await contract.retrieve(key);
      } catch (err) {
        console.error("Error retrieving value from vault.", err);
      }
    }
  }

  async function storeVaultItem(key, value) {
    // TODO: Try to handle this globally
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(vaultAddress, Vault.abi, signer);

      try {
        const tx = await contract.store(key, value);
        await tx.wait();
      } catch (err) {
        console.error("Error storing value in vault.", err);
      }
    }
  }

  async function getBalance() {
    if (!acctAddr) {
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
      <ErrorPopup></ErrorPopup>
      {connectedAddrDisplay}
      <hr />
      Key: <input type="text" onChange={(e) => setVaultKey(e.target.value)} style={{ marginRight: "10px" }}></input>
      Value: <input type="text" onChange={(e) => setVaultValue(e.target.value)}></input>
      <hr />
      <input className='btn' type="button" onClick={requestAccount} value="Request Acct" />
      <input className='btn' type="button" onClick={async () => {
        const balance = await getBalance();
        setMsg({
          msg: `Balance: ${balance}`,
          type: "info",
          show: true,
        });
      }} value="Get balance" />
      <input className='btn' type="button" onClick={async () => {
        if (!vaultKey) {
          setMsg({
            msg: "Please provide a vault key",
            type: "error",
            show: true,
          });
          return;
        }
        let value = await retrieveVaultItem(vaultKey);
        setMsg({
          msg: `Retrieved value: ${value}`,
          type: "info",
          show: true,
        });
      }} value="Retrieve from vault" />
      <input className='btn' type="button" onClick={async () => {
        await storeVaultItem(vaultKey, vaultValue);
      }} value="Store in vault" />
      <input className='btn' type="button" onClick={async () => {
        console.log("Testing error component");
        setMsg({
          msg: "testing error",
          type: "error",
          show: true
        });
      }} value="Test error" />
      <style jsx>{`
            .btn {
                margin-right: 5px;
            }
            `}
      </style>
    </div>
  );
}
