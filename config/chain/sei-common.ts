import { CHAIN_TYPE, NETWORK } from '../schemas/common.schema.js';
import {
  getCommonChainInput,
  SEI_L1_CONTRACT_ADDRESSES,
  SEI_L2_TOKEN_ADDRESSES,
} from './common.chain.js';
import type { PartialDeep } from 'type-fest';
import type { SeiChainConfig } from '../schemas/sei.chain.schema.js';

// This function provides common defaults specifically for Sei chains,
// building upon the universal getCommonChainInput.
// Configuration:
// - L1 Depositor: Sepolia (testnet) / Ethereum Mainnet (mainnet)
// - L2 Token: SeiEVM Testnet (testnet, placeholder) / SeiEVM Mainnet (mainnet)
export const getSeiCommonInput = (targetNetwork: NETWORK): PartialDeep<SeiChainConfig> => {
  const commonInput = getCommonChainInput(targetNetwork);
  return {
    ...commonInput,
    chainType: CHAIN_TYPE.SEI,
    l1BitcoinDepositorAddress: SEI_L1_CONTRACT_ADDRESSES[targetNetwork],
    // Enable reveal deposit API for Sei (NTT pattern with L1 depositor)
    supportsRevealDepositAPI: true,
    // L2 token address on Sei EVM network
    // Mainnet: Sei EVM Chain ID 1329 (Pacific-1)
    // Testnet: Sei EVM Chain ID 1328 (Atlantic-2) - placeholder, to be deployed
    l2TokenAddress: SEI_L2_TOKEN_ADDRESSES[targetNetwork],
    // Wormhole Chain ID for Sei: 40 (used for cross-chain messaging via Wormhole)
    // NOTE: This is NOT the same as Sei EVM's native Chain ID (1329 for Pacific-1 mainnet, 1328 for Atlantic-2 testnet)
    wormholeChainId: 40,
    // Other Sei-specific common defaults can be added here
  };
};
