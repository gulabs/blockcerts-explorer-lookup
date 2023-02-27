"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorerApi = void 0;
const stripHashPrefix_1 = require("../../utils/stripHashPrefix");
const blockchains_1 = require("../../constants/blockchains");
const api_1 = require("../../constants/api");
const supported_chains_1 = require("../../constants/supported-chains");
function getApiBaseURL(chain) {
    if (chain === supported_chains_1.SupportedChains.Ethgusandbox) {
        return 'https://sandbox1.japanopenchain.org/api';
    }
    throw new Error(`Blockscout does not support ${chain}`);
}
function getTransactionServiceURL(chain) {
    const baseUrl = getApiBaseURL(chain);
    return `${baseUrl}?module=transaction&action=gettxinfo&txhash=${api_1.TRANSACTION_ID_PLACEHOLDER}`;
}
function parsingFunction({ jsonResponse }) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = jsonResponse.result;
        const time = new Date(parseInt(data.timeStamp, 16) * 1000);
        const issuingAddress = data.from;
        const remoteHash = (0, stripHashPrefix_1.stripHashPrefix)(data.input, blockchains_1.BLOCKCHAINS.ethmain.prefixes); // remove '0x'
        // The method of checking revocations by output spent do not work with Ethereum.
        // There are no input/outputs, only balances.
        return {
            remoteHash,
            issuingAddress,
            time,
            revokedAddresses: []
        };
    });
}
exports.explorerApi = {
    serviceURL: getTransactionServiceURL,
    serviceName: api_1.TRANSACTION_APIS.blockscout,
    parsingFunction,
    priority: -1
};
