import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  provider: ethers.providers.Web3Provider;
  signer!: ethers.providers.JsonRpcSigner;
  constructor() {
    let ethereum = (window as any).ethereum;

    // Ensure the browser has MetaMask installed
    if (typeof ethereum === 'undefined') {
      alert('Please install MetaMask first. ');
      throw new Error('Please install MetaMask first.');
    }

    this.provider = new ethers.providers.Web3Provider((window as any).ethereum);
  }
  async login() {
    await this.provider.send('eth_requestAccounts', []);
    const account = await this.provider.listAccounts();

    if (account.length === 0) {
      alert('Please login to MetaMask.');
      throw new Error('Please login to MetaMask.');
    }

    if (account.length > 1) {
      alert('Please select one account.');
      throw new Error('Please select one account.');
    }

    this.signer = this.provider.getSigner();

    const loginMessage = `${account[0]}-${Date.now()}`;
    const signature = await this.signer.signMessage(loginMessage);
  }
}
