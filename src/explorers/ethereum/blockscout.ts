import { stripHashPrefix } from '../../utils/stripHashPrefix';
import { BLOCKCHAINS } from '../../constants/blockchains';
import { TransactionData } from '../../models/transactionData';
import { TRANSACTION_APIS, TRANSACTION_ID_PLACEHOLDER } from '../../constants/api';
import { ExplorerAPI, IParsingFunctionAPI } from '../../models/explorers';
import { SupportedChains } from '../../constants/supported-chains';

type TxResponse = {
  status: string;
  message: string;
  result: {
    blockNumber: string;
    confirmations: string;
    from: string;
    gasLimit: string;
    gasPrice: string;
    gasUsed: string;
    hash: string;
    input: string;
    logs: any[];
    next_page_params: any;
    revertReason: string;
    success: boolean;
    timeStamp: string;
    to: string;
    value: string;
  };
};

function getApiBaseURL (chain: SupportedChains): string {
  if (chain === SupportedChains.Ethgusandbox) {
    return 'https://sandbox1.japanopenchain.org/api';
  }

  throw new Error(`Blockscout does not support ${chain}`);
}

function getTransactionServiceURL (chain: SupportedChains): string {
  const baseUrl = getApiBaseURL(chain);
  return `${baseUrl}?module=transaction&action=gettxinfo&txhash=${TRANSACTION_ID_PLACEHOLDER}`;
}

async function parsingFunction ({ jsonResponse }: IParsingFunctionAPI): Promise<TransactionData> {
  const data = (jsonResponse as TxResponse).result;
  const time: Date = new Date(parseInt(data.timeStamp, 16) * 1000);
  const issuingAddress: string = data.from;
  const remoteHash = stripHashPrefix(data.input, BLOCKCHAINS.ethmain.prefixes); // remove '0x'

  // The method of checking revocations by output spent do not work with Ethereum.
  // There are no input/outputs, only balances.
  return {
    remoteHash,
    issuingAddress,
    time,
    revokedAddresses: []
  };
}

export const explorerApi: ExplorerAPI = {
  serviceURL: getTransactionServiceURL,
  serviceName: TRANSACTION_APIS.blockscout,
  parsingFunction,
  priority: -1
};
