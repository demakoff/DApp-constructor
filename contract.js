(function () {
    window.DApp.Contract = Contract;

    const POLLING_DELAY = 700;
    const POLLING_LIMIT = 30000;

    function Contract(abi, address) {
        const contract = web3.eth.contract(abi).at(address);

        /**
         * Helpers
         */

        function getMethodABI(name) {
            return abi.find(method => method.name === name);
        }

        function encodeFunctionCall(name, args = []) {
            // TODO accept abi object?
            const methodABI = getMethodABI(name);
            const solidityFunction = new DApp.SolidityFunction('', methodABI, '');
            return solidityFunction.toPayload(args).data;
        }

        function pollRecursive(signal, interval, limit) {
            return Promise.resolve(signal())
                .then(result => result
                    ? result
                    : new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (limit < 0) {
                                throw new Error('Polling waiting limit has been exceeded');
                            }
                            pollRecursive(signal, interval, limit - interval)
                                .then(resolve, reject);
                        }, interval);
                    })
                );
        }

        /**
         * Public
         */

        /**
         * Get data from blockchain
         * @param name
         * @param args
         * @returns {Promise<any>}
         */
        function read(name, args = []) {
            return new Promise((resolve, reject) => {
                contract[ name ].call(...args, (error, result) => error ? reject(error) : resolve(result));
            });
        }

        /**
         * Write data to blockchain
         * @param name
         * @param args
         * @param options
         * @returns {PromiseLike<any> | Promise<any>}
         */
        function write(name, args = [], options = {}) {
            const data = encodeFunctionCall(name, args);
            const transactionObject = Object.assign({
                to: address,
                data
            }, options);

            const estimateGas = () => new Promise((resolve, reject) => {
                web3.eth.estimateGas(
                    transactionObject,
                    (error, result) => error ? reject(error) : resolve(result)
                )
            });

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
                )
            });

            const receiptPolling = (hash) => {
                return pollRecursive(() => getTransactionReceipt(hash), POLLING_DELAY, POLLING_LIMIT );
            };

            return estimateGas()
                .then(sendTransaction)
                .then(receiptPolling);
        }

        /**
         * Read or write data from blockchain (depends on called method)
         * @param name
         * @param args
         * @returns {*}
         */
        function execute(name, args = []) {
            const { constant } = getMethodABI(name);
            return constant ? read(name, args) : write(name, args);
        }

        Contract.api = { read, write, execute };
    }
})();