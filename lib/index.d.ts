export interface TransactionData {
	remoteHash: string;
	issuingAddress: string;
	time: string | Date;
	revokedAddresses: string[];
}
export declare enum SupportedChains {
	Bitcoin = "bitcoin",
	Ethmain = "ethmain",
	Ethropst = "ethropst",
	Ethrinkeby = "ethrinkeby",
	Ethgoerli = "ethgoerli",
	Ethsepolia = "ethsepolia",
	Ethgusandbox = "ethgusandbox",
	Ethjoc = "ethjoc",
	Mocknet = "mocknet",
	Regtest = "regtest",
	Testnet = "testnet"
}
declare enum TRANSACTION_APIS {
	blockcypher = "blockcypher",
	blockstream = "blockstream",
	etherscan = "etherscan",
	blockscout = "blockscout"
}
export interface ExplorerURLs {
	main: string;
	test: string;
}
export interface IParsingFunctionAPI {
	jsonResponse?: any;
	chain?: SupportedChains;
	key?: string;
	keyPropertyName?: string;
	transactionId?: string;
	serviceUrl?: string;
}
export declare type TExplorerParsingFunction = ((data: IParsingFunctionAPI) => TransactionData) | ((data: IParsingFunctionAPI) => Promise<TransactionData>);
export interface ExplorerAPI {
	serviceURL?: string | ExplorerURLs | ((chain: SupportedChains) => string);
	priority?: 0 | 1 | -1;
	parsingFunction?: TExplorerParsingFunction;
	serviceName?: TRANSACTION_APIS;
	key?: string;
	keyPropertyName?: string;
	apiType?: "rpc" | "rest";
	chainType?: "btc" | "evm" | "eth";
}
export function lookForTx({ transactionId, chain, explorerAPIs }: {
	transactionId: string;
	chain: SupportedChains;
	explorerAPIs?: ExplorerAPI[];
}): Promise<TransactionData>;
export interface IRequestParameters {
	url: string;
	method?: "GET" | "POST";
	body?: any;
	forceHttp?: boolean;
	"bearer-token"?: string;
}
export function request(obj: IRequestParameters): Promise<any>;
declare enum BlinkCodes {
	btc = "btc",
	eth = "eth",
	mocknet = "mocknet"
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
export declare const BLOCKCHAINS: {
	[chain in SupportedChains]: IBlockchainObject;
};
export declare function isTestChain(chain: SupportedChains): boolean;

export {};
