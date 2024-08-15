// src/ethers.d.ts
import { providers as EthersProviders } from 'ethers';

declare module 'ethers' {
  export const providers: typeof EthersProviders;
}
declare global {
    interface Window {
      ethereum: any;
    }
  }