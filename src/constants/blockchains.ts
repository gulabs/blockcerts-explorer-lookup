import { TRANSACTION_ID_PLACEHOLDER } from './api';
import { SupportedChains } from './supported-chains';

// TODO: ideally this list comes from @vaultie/lds-merkle-proof-2019 from the Keymap definition
enum BlinkCodes {
  btc = 'btc',
  eth = 'eth',
  mocknet = 'mocknet'
}

export interface IBlockchainObject {
  code: SupportedChains;
  blinkCode: BlinkCodes;
  name: string;
  prefixes?: string[];
  test?: boolean;
  signatureValue: string;
  transactionTemplates: {
    full: string;
    raw: string;
  };
}

const BLOCKCHAINS: {[chain in SupportedChains]: IBlockchainObject} = {
  [SupportedChains.Bitcoin]: {
    code: SupportedChains.Bitcoin,
    blinkCode: BlinkCodes.btc,
    name: 'Bitcoin',
    prefixes: ['6a20', 'OP_RETURN '],
    signatureValue: 'bitcoinMainnet',
    transactionTemplates: {
      full: `https://blockchain.info/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://blockchain.info/rawtx/${TRANSACTION_ID_PLACEHOLDER}`
    }
  },
  [SupportedChains.Ethmain]: {
    code: SupportedChains.Ethmain,
    blinkCode: BlinkCodes.eth,
    name: 'Ethereum',
    prefixes: ['0x'],
    signatureValue: 'ethereumMainnet',
    transactionTemplates: {
      full: `https://etherscan.io/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://etherscan.io/tx/${TRANSACTION_ID_PLACEHOLDER}`
    }
  },
  [SupportedChains.Ethropst]: {
    code: SupportedChains.Ethropst,
    blinkCode: BlinkCodes.eth,
    name: 'Ethereum Testnet',
    signatureValue: 'ethereumRopsten',
    transactionTemplates: {
      full: `https://ropsten.etherscan.io/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://ropsten.etherscan.io/getRawTx?tx=${TRANSACTION_ID_PLACEHOLDER}`
    }
  },
  [SupportedChains.Ethrinkeby]: {
    code: SupportedChains.Ethrinkeby,
    blinkCode: BlinkCodes.eth,
    name: 'Ethereum Testnet',
    signatureValue: 'ethereumRinkeby',
    transactionTemplates: {
      full: `https://rinkeby.etherscan.io/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://rinkeby.etherscan.io/getRawTx?tx=${TRANSACTION_ID_PLACEHOLDER}`
    }
  },
  [SupportedChains.Ethgoerli]: {
    code: SupportedChains.Ethgoerli,
    blinkCode: BlinkCodes.eth,
    name: 'Ethereum Testnet',
    signatureValue: 'ethereumGoerli',
    transactionTemplates: {
      full: `https://goerli.etherscan.io/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://goerli.etherscan.io/getRawTx?tx=${TRANSACTION_ID_PLACEHOLDER}`
    }
  },
  [SupportedChains.Ethsepolia]: {
    code: SupportedChains.Ethsepolia,
    blinkCode: BlinkCodes.eth,
    name: 'Ethereum Testnet',
    signatureValue: 'ethereumSepolia',
    transactionTemplates: {
      full: `https://sepolia.etherscan.io/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://sepolia.etherscan.io/getRawTx?tx=${TRANSACTION_ID_PLACEHOLDER}`
    }
  },
  [SupportedChains.Ethgusandbox]: {
    code: SupportedChains.Ethgusandbox,
    blinkCode: BlinkCodes.eth,
    name: 'Ethereum G.U.Sandbox',
    signatureValue: 'ethereumGusandbox',
    transactionTemplates: {
      full: `https://sandbox1.japanopenchain.org/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://sandbox1.japanopenchain.org/getRawTx?tx=${TRANSACTION_ID_PLACEHOLDER}`
    }
  },
  [SupportedChains.Ethjoc]: {
    code: SupportedChains.Ethjoc,
    blinkCode: BlinkCodes.eth,
    name: 'Ethereum Japan Open Chain',
    signatureValue: 'ethereumJoc',
    transactionTemplates: {
      full: `https://mainnet.japanopenchain.org/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://mainnet.japanopenchain.org/getRawTx?tx=${TRANSACTION_ID_PLACEHOLDER}`
    }
  },
  [SupportedChains.Mocknet]: {
    code: SupportedChains.Mocknet,
    blinkCode: BlinkCodes.mocknet,
    name: 'Mocknet',
    test: true,
    signatureValue: 'mockchain',
    transactionTemplates: {
      full: '',
      raw: ''
    }
  },
  [SupportedChains.Regtest]: {
    code: SupportedChains.Regtest,
    blinkCode: BlinkCodes.mocknet,
    name: 'Mocknet',
    test: true,
    signatureValue: 'bitcoinRegtest',
    transactionTemplates: {
      full: '',
      raw: ''
    }
  },
  [SupportedChains.Testnet]: {
    code: SupportedChains.Testnet,
    blinkCode: BlinkCodes.btc,
    name: 'Bitcoin Testnet',
    signatureValue: 'bitcoinTestnet',
    transactionTemplates: {
      full: `https://testnet.blockchain.info/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://testnet.blockchain.info/rawtx/${TRANSACTION_ID_PLACEHOLDER}`
    }
  }
};

// TODO: use test boolean from entry?
function isTestChain (chain: SupportedChains): boolean {
  return chain !== BLOCKCHAINS.bitcoin.code && chain !== BLOCKCHAINS.ethmain.code;
}

export {
  BLOCKCHAINS,
  isTestChain
};
