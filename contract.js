(function () {
    window.Contract = Contract;

    function Contract(abi, address) {
        const contract = web3.eth.contract(abi).at(address);

        Contract.api = {
            callContractMethod: function (name, args = []) {
                contract[ name ].call(...args, (error, result) => {
                    if (error) {
                        return console.error(`Something went wrong with "${name}": ${error}`)
                    }
                    document.querySelector(`.result__${name} [data-call-result]`).innerText = result;
                });
            },
            createMethodTransaction: function (name, args = []) {
                const methodAbi = abi.find((oneMethod) => oneMethod.name === name);
                const solidityFunction = new SolidityFunction('', methodAbi, '');
                const payloadData = solidityFunction.toPayload(args).data;
                const transactionObject = {
                    to: address,
                    data: payloadData
                };
                const callback = function(error, result){
                    if (error) {
                        return console.error(`Something went wrong with "${name}": ${error}`)
                    }
                    document.querySelector(`.result__${name} [data-call-result]`).innerText = result;
                };
                web3.eth.sendTransaction(transactionObject, callback)
            }
        }
    }
})();