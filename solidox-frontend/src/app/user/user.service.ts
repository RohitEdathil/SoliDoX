import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  provider: ethers.providers.Web3Provider;

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
  }
}
