"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTestChain = exports.BLOCKCHAINS = void 0;
const api_1 = require("./api");
const supported_chains_1 = require("./supported-chains");
// TODO: ideally this list comes from @vaultie/lds-merkle-proof-2019 from the Keymap definition
var BlinkCodes;
(function (BlinkCodes) {
    BlinkCodes["btc"] = "btc";
    BlinkCodes["eth"] = "eth";
    BlinkCodes["mocknet"] = "mocknet";
})(BlinkCodes || (BlinkCodes = {}));
const BLOCKCHAINS = {
    [supported_chains_1.SupportedChains.Bitcoin]: {
        code: supported_chains_1.SupportedChains.Bitcoin,
        blinkCode: BlinkCodes.btc,
        name: 'Bitcoin',
        prefixes: ['6a20', 'OP_RETURN '],
        signatureValue: 'bitcoinMainnet',
        transactionTemplates: {
            full: `https://blockchain.info/tx/${api_1.TRANSACTION_ID_PLACEHOLDER}`,
            raw: `https://blockchain.info/rawtx/${api_1.TRANSACTION_ID_PLACEHOLDER}`
        }
    },
    [supported_chains_1.SupportedChains.Ethmain]: {
        code: supported_chains_1.SupportedChains.Ethmain,
        blinkCode: BlinkCodes.eth,
        name: 'Ethereum',
        prefixes: ['0x'],
        signatureValue: 'ethereumMainnet',
        transactionTemplates: {
            full: `https://etherscan.io/tx/${api_1.TRANSACTION_ID_PLACEHOLDER}`,
            raw: `https://etherscan.io/tx/${api_1.TRANSACTION_ID_PLACEHOLDER}`
        }
    },
    [supported_chains_1.SupportedChains.Ethropst]: {
        code: supported_chains_1.SupportedChains.Ethropst,
        blinkCode: BlinkCodes.eth,
        name: 'Ethereum Testnet',
        signatureValue: 'ethereumRopsten',
        transactionTemplates: {
            full: `https://ropsten.etherscan.io/tx/${api_1.TRANSACTION_ID_PLACEHOLDER}`,
            raw: `https://ropsten.etherscan.io/getRawTx?tx=${api_1.TRANSACTION_ID_PLACEHOLDER}`
        }
    },
    [supported_chains_1.SupportedChains.Ethrinkeby]: {
        code: supported_chains_1.SupportedChains.Ethrinkeby,
        blinkCode: BlinkCodes.eth,
        name: 'Ethereum Testnet',
        signatureValue: 'ethereumRinkeby',
        transactionTemplates: {
            full: `https://rinkeby.etherscan.io/tx/${api_1.TRANSACTION_ID_PLACEHOLDER}`,
            raw: `https://rinkeby.etherscan.io/getRawTx?tx=${api_1.TRANSACTION_ID_PLACEHOLDER}`
        }
    },
    [supported_chains_1.SupportedChains.Ethgoerli]: {
        code: supported_chains_1.SupportedChains.Ethgoerli,
        blinkCode: BlinkCodes.eth,
        name: 'Ethereum Testnet',
        signatureValue: 'ethereumGoerli',
        transactionTemplates: {
            full: `https://goerli.etherscan.io/tx/${api_1.TRANSACTION_ID_PLACEHOLDER}`,
            raw: `https://goerli.etherscan.io/getRawTx?tx=${api_1.TRANSACTION_ID_PLACEHOLDER}`
        }
    },
    [supported_chains_1.SupportedChains.Ethsepolia]: {
        code: supported_chains_1.SupportedChains.Ethsepolia,
        blinkCode: BlinkCodes.eth,
        name: 'Ethereum Testnet',
        signatureValue: 'ethereumSepolia',
        transactionTemplates: {
            full: `https://sepolia.etherscan.io/tx/${api_1.TRANSACTION_ID_PLACEHOLDER}`,
            raw: `https://sepolia.etherscan.io/getRawTx?tx=${api_1.TRANSACTION_ID_PLACEHOLDER}`
        }
    },
    [supported_chains_1.SupportedChains.Ethgusandbox]: {
        code: supported_chains_1.SupportedChains.Ethgusandbox,
        blinkCode: BlinkCodes.eth,
        name: 'Ethereum G.U.Sandbox',
        signatureValue: 'ethereumGusandbox',
        transactionTemplates: {
            full: `https://sandbox1.japanopenchain.org/tx/${api_1.TRANSACTION_ID_PLACEHOLDER}`,
            raw: `https://sandbox1.japanopenchain.org/getRawTx?tx=${api_1.TRANSACTION_ID_PLACEHOLDER}`
        }
    },
    [supported_chains_1.SupportedChains.Ethjoc]: {
        code: supported_chains_1.SupportedChains.Ethjoc,
        blinkCode: BlinkCodes.eth,
        name: 'Ethereum Japan Open Chain',
        signatureValue: 'ethereumJoc',
        transactionTemplates: {
            full: `https://mainnet.japanopenchain.org/tx/${api_1.TRANSACTION_ID_PLACEHOLDER}`,
            raw: `https://mainnet.japanopenchain.org/getRawTx?tx=${api_1.TRANSACTION_ID_PLACEHOLDER}`
        }
    },
    [supported_chains_1.SupportedChains.Mocknet]: {
        code: supported_chains_1.SupportedChains.Mocknet,
        blinkCode: BlinkCodes.mocknet,
        name: 'Mocknet',
        test: true,
        signatureValue: 'mockchain',
        transactionTemplates: {
            full: '',
            raw: ''
        }
    },
    [supported_chains_1.SupportedChains.Regtest]: {
        code: supported_chains_1.SupportedChains.Regtest,
        blinkCode: BlinkCodes.mocknet,
        name: 'Mocknet',
        test: true,
        signatureValue: 'bitcoinRegtest',
        transactionTemplates: {
            full: '',
            raw: ''
        }
    },
    [supported_chains_1.SupportedChains.Testnet]: {
        code: supported_chains_1.SupportedChains.Testnet,
        blinkCode: BlinkCodes.btc,
        name: 'Bitcoin Testnet',
        signatureValue: 'bitcoinTestnet',
        transactionTemplates: {
            full: `https://testnet.blockchain.info/tx/${api_1.TRANSACTION_ID_PLACEHOLDER}`,
            raw: `https://testnet.blockchain.info/rawtx/${api_1.TRANSACTION_ID_PLACEHOLDER}`
        }
    }
};
exports.BLOCKCHAINS = BLOCKCHAINS;
// TODO: use test boolean from entry?
function isTestChain(chain) {
    return chain !== BLOCKCHAINS.bitcoin.code && chain !== BLOCKCHAINS.ethmain.code;
}
exports.isTestChain = isTestChain;
