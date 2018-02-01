const POLLING_DELAY = 700;
const POLLING_LIMIT = 30000;

declare const web3;
import { polling } from './helpers';
import * as SolidityFunction from 'web3/lib/web3/function';

export interface IContract {
    (abi: any, address: string): void;
    read: (name: string, args?: any[]) => Promise<any>;
    write: (name: string, args?: any[], options?: any) => Promise<any>;
    execute: (name: string, args?: any[]) => Promise<any>;
}

function contractFactory(abi: any, address: string): void {
    const contract = web3.eth.contract(abi).at(address);

    const getMethodABI = (name): any => {
        return abi.find(method => method.name === name);
    };

    const encodeFunctionCall = (name, args = []): string => {
        // TODO accept abi object?
        const methodABI = getMethodABI(name);
        const solidityFunction = new SolidityFunction('', methodABI, '');
        return solidityFunction.toPayload(args).data;
    };

    /**
     * Get data from blockchain
     * @param name
     * @param args
     * @returns {Promise<any>}
     */
    (contractFactory as IContract).read = (name: string, args: any[] = []): Promise<any> => {
        return new Promise((resolve, reject) => {
            contract[name].call(...args, (error, result) => error ? reject(error) : resolve(result));
        });
    };

    /**
     * Write data to blockchain
     * @param name
     * @param args
     * @param options
     * @returns {PromiseLike<any> | Promise<any>}
     */
    (contractFactory as IContract).write = (name: string, args: any[] = [], options: any = {}): Promise<any> => {
        const data = encodeFunctionCall(name, args);
        const transactionObject = Object.assign({
            to: address,
            data
        }, options);

        const estimateGas = () => new Promise((resolve, reject) => {
            web3.eth.estimateGas(
                transactionObject,
                (error, result) => error ? reject(error) : resolve(result)
            );
        });

        /**
         * May return JSON RPC error
         * @link http://www.jsonrpc.org/specification#error_object
         * @returns {Promise<any>}
         */
        const sendTransaction = () => new Promise((resolve, reject) => {
            web3.eth.sendTransaction(
                transactionObject,
                (error, result) => error ? reject(error) : resolve(result)
            );
        });

        const getTransactionReceipt = (hashString) => new Promise((resolve, reject) => {
            web3.eth.getTransactionReceipt(
                hashString,
                (error, result) => error ? reject(error) : resolve(result)
            );
        });

        const receiptPolling = (hash) => {
            return polling(() => getTransactionReceipt(hash), POLLING_DELAY, POLLING_LIMIT);
        };

        return estimateGas()
            .then(sendTransaction)
            .then(receiptPolling);
    };

    /**
     * Read or write data from blockchain (depends on called method)
     * @param name
     * @param args
     * @param options
     * @returns {*}
     */
    (contractFactory as IContract).execute = (name: string, args: any[] = [], options: any = {}): Promise<any> => {
        const { constant } = getMethodABI(name);
        return constant
            ? (contractFactory as IContract).read(name, args)
            : (contractFactory as IContract).write(name, args, options);
    };
}

export const Contract: IContract = contractFactory as IContract;
