var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { stripHashPrefix } from '../../utils/stripHashPrefix';
import { BLOCKCHAINS } from '../../constants/blockchains';
import { TRANSACTION_APIS, TRANSACTION_ID_PLACEHOLDER } from '../../constants/api';
import { SupportedChains } from '../../constants/supported-chains';
function getApiBaseURL(chain) {
    if (chain === SupportedChains.Ethgusandbox) {
        return 'https://sandbox1.japanopenchain.org/api';
    }
    throw new Error(`Blockscout does not support ${chain}`);
}
function getTransactionServiceURL(chain) {
    const baseUrl = getApiBaseURL(chain);
    return `${baseUrl}?module=transaction&action=gettxinfo&txhash=${TRANSACTION_ID_PLACEHOLDER}`;
}
function parsingFunction({ jsonResponse }) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = jsonResponse.result;
        const time = new Date(parseInt(data.timeStamp, 16) * 1000);
        const issuingAddress = data.from;
        const remoteHash = stripHashPrefix(data.input, BLOCKCHAINS.ethmain.prefixes); // remove '0x'
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
export const explorerApi = {
    serviceURL: getTransactionServiceURL,
    serviceName: TRANSACTION_APIS.blockscout,
    parsingFunction,
    priority: -1
};
