import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { ApiService } from '../api/api.service';
import { NotifService } from '../notif/notif.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  provider: ethers.providers.Web3Provider;
  signer!: ethers.providers.JsonRpcSigner;
  address!: string;
  constructor(
    private apiService: ApiService,
    private notifService: NotifService,
    private router: Router
  ) {
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
      this.notifService.error('Please select an account.');
      throw new Error();
    }

    if (account.length > 1) {
      this.notifService.error('Please select only one account.');
      return;
    }

    this.address = account[0];

    this.signer = this.provider.getSigner();

    const timestamp = Date.now();
    const loginMessage = `${account[0]}-${timestamp}`;

    let signature: string;
    try {
      signature = await this.signer.signMessage(loginMessage);
    } catch (e) {
      this.notifService.error('Please sign the message to login.');
      return;
    }

    const loginResponse = await this.apiService.post('/auth/login', {
      timestamp,
      signature,
      address: account[0],
    });

    this.apiService.setToken(loginResponse.accessToken);
    window.localStorage.setItem('accessToken', loginResponse.accessToken);

    this.router.navigate(['/dashboard']);
  }

  async attemptPersistantLogin() {
    // Fetch the access token from local storage
    // const accessToken = window.localStorage.getItem('accessToken');
    const accessToken = undefined;
    const account = await this.provider.listAccounts();

    this.address = account[0];
    this.signer = this.provider.getSigner();

    // Paths that do not require authentication
    const publicPaths = ['/', '/login', '/signup', '/verify'];

    // no access token, redirect to login if not on a public path
    if (!accessToken) {
      if (!publicPaths.includes(window.location.pathname)) {
        this.router.navigate(['/login']);
      }
      return;
    }
    // Set the access token in the api service
    this.apiService.setToken(accessToken);

    // Automatically redirect to dashboard if on login page
    if (window.location.pathname === '/login') {
      this.router.navigate(['/dashboard']);
    }
  }
}
