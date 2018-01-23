(function() {
    window.findSmartContract = findSmartContract;

    const dataTypes = [
        'uint8...uint256',
        'int8...int256',
        'fixed8x1...fixed256x80',
        'ufixed8x1...ufixed256x80',
        'bytes1...bytes32',
        'bytes',
        'address',
        'function',
        'bool',
        'string',
        '...[]'
    ];

    const erc20Abi = [
        {
            'constant': true,
            'inputs': [],
            'name': 'name',
            'outputs': [
                {
                    'name': '',
                    'type': 'string'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': false,
            'inputs': [
                {
                    'name': '_spender',
                    'type': 'address'
                },
                {
                    'name': '_value',
                    'type': 'uint256'
                }
            ],
            'name': 'approve',
            'outputs': [
                {
                    'name': 'success',
                    'type': 'bool'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
                {
                    'name': '',
                    'type': 'uint256'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': false,
            'inputs': [
                {
                    'name': '_from',
                    'type': 'address'
                },
                {
                    'name': '_to',
                    'type': 'address'
                },
                {
                    'name': '_value',
                    'type': 'uint256'
                }
            ],
            'name': 'transferFrom',
            'outputs': [
                {
                    'name': 'success',
                    'type': 'bool'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': true,
            'inputs': [],
            'name': 'decimals',
            'outputs': [
                {
                    'name': '',
                    'type': 'uint8'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': true,
            'inputs': [],
            'name': 'version',
            'outputs': [
                {
                    'name': '',
                    'type': 'string'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': true,
            'inputs': [
                {
                    'name': '_owner',
                    'type': 'address'
                }
            ],
            'name': 'balanceOf',
            'outputs': [
                {
                    'name': 'balance',
                    'type': 'uint256'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': true,
            'inputs': [],
            'name': 'symbol',
            'outputs': [
                {
                    'name': '',
                    'type': 'string'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': false,
            'inputs': [
                {
                    'name': '_to',
                    'type': 'address'
                },
                {
                    'name': '_value',
                    'type': 'uint256'
                }
            ],
            'name': 'transfer',
            'outputs': [
                {
                    'name': 'success',
                    'type': 'bool'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': false,
            'inputs': [
                {
                    'name': '_spender',
                    'type': 'address'
                },
                {
                    'name': '_value',
                    'type': 'uint256'
                },
                {
                    'name': '_extraData',
                    'type': 'bytes'
                }
            ],
            'name': 'approveAndCall',
            'outputs': [
                {
                    'name': 'success',
                    'type': 'bool'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'constant': true,
            'inputs': [
                {
                    'name': '_owner',
                    'type': 'address'
                },
                {
                    'name': '_spender',
                    'type': 'address'
                }
            ],
            'name': 'allowance',
            'outputs': [
                {
                    'name': 'remaining',
                    'type': 'uint256'
                }
            ],
            'payable': false,
            'type': 'function'
        },
        {
            'inputs': [
                {
                    'name': '_initialAmount',
                    'type': 'uint256'
                },
                {
                    'name': '_tokenName',
                    'type': 'string'
                },
                {
                    'name': '_decimalUnits',
                    'type': 'uint8'
                },
                {
                    'name': '_tokenSymbol',
                    'type': 'string'
                }
            ],
            'type': 'constructor'
        },
        {
            'payable': false,
            'type': 'fallback'
        },
        {
            'anonymous': false,
            'inputs': [
                {
                    'indexed': true,
                    'name': '_from',
                    'type': 'address'
                },
                {
                    'indexed': true,
                    'name': '_to',
                    'type': 'address'
                },
                {
                    'indexed': false,
                    'name': '_value',
                    'type': 'uint256'
                }
            ],
            'name': 'Transfer',
            'type': 'event'
        },
        {
            'anonymous': false,
            'inputs': [
                {
                    'indexed': true,
                    'name': '_owner',
                    'type': 'address'
                },
                {
                    'indexed': true,
                    'name': '_spender',
                    'type': 'address'
                },
                {
                    'indexed': false,
                    'name': '_value',
                    'type': 'uint256'
                }
            ],
            'name': 'Approval',
            'type': 'event'
        }
    ];
    const storjAbi = [
        {
            'constant': true,
            'inputs': [],
            'name': 'name',
            'outputs': [ { 'name': '', 'type': 'string' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': '_spender', 'type': 'address' }, { 'name': '_value', 'type': 'uint256' } ],
            'name': 'approve',
            'outputs': [ { 'name': 'success', 'type': 'bool' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [ { 'name': '', 'type': 'uint256' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': '_from', 'type': 'address' }, {
                'name': '_to',
                'type': 'address'
            }, { 'name': '_value', 'type': 'uint256' } ],
            'name': 'transferFrom',
            'outputs': [ { 'name': 'success', 'type': 'bool' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'decimals',
            'outputs': [ { 'name': '', 'type': 'uint256' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': 'burnAmount', 'type': 'uint256' } ],
            'name': 'burn',
            'outputs': [],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': 'value', 'type': 'uint256' } ],
            'name': 'upgrade',
            'outputs': [],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'upgradeAgent',
            'outputs': [ { 'name': '', 'type': 'address' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'upgradeMaster',
            'outputs': [ { 'name': '', 'type': 'address' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [ { 'name': '_owner', 'type': 'address' } ],
            'name': 'balanceOf',
            'outputs': [ { 'name': 'balance', 'type': 'uint256' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'getUpgradeState',
            'outputs': [ { 'name': '', 'type': 'uint8' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'symbol',
            'outputs': [ { 'name': '', 'type': 'string' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'canUpgrade',
            'outputs': [ { 'name': '', 'type': 'bool' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': '_to', 'type': 'address' }, { 'name': '_value', 'type': 'uint256' } ],
            'name': 'transfer',
            'outputs': [ { 'name': 'success', 'type': 'bool' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'totalUpgraded',
            'outputs': [ { 'name': '', 'type': 'uint256' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': 'agent', 'type': 'address' } ],
            'name': 'setUpgradeAgent',
            'outputs': [],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [ { 'name': '_owner', 'type': 'address' }, { 'name': '_spender', 'type': 'address' } ],
            'name': 'allowance',
            'outputs': [ { 'name': 'remaining', 'type': 'uint256' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'isToken',
            'outputs': [ { 'name': '', 'type': 'bool' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'BURN_ADDRESS',
            'outputs': [ { 'name': '', 'type': 'address' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': 'master', 'type': 'address' } ],
            'name': 'setUpgradeMaster',
            'outputs': [],
            'payable': false,
            'type': 'function'
        }, {
            'inputs': [ { 'name': '_owner', 'type': 'address' }, {
                'name': '_name',
                'type': 'string'
            }, { 'name': '_symbol', 'type': 'string' }, {
                'name': '_totalSupply',
                'type': 'uint256'
            }, { 'name': '_decimals', 'type': 'uint256' } ], 'payable': false, 'type': 'constructor'
        }, {
            'anonymous': false,
            'inputs': [ { 'indexed': true, 'name': '_from', 'type': 'address' }, {
                'indexed': true,
                'name': '_to',
                'type': 'address'
            }, { 'indexed': false, 'name': '_value', 'type': 'uint256' } ],
            'name': 'Upgrade',
            'type': 'event'
        }, {
            'anonymous': false,
            'inputs': [ { 'indexed': false, 'name': 'agent', 'type': 'address' } ],
            'name': 'UpgradeAgentSet',
            'type': 'event'
        }, {
            'anonymous': false,
            'inputs': [ { 'indexed': false, 'name': 'burner', 'type': 'address' }, {
                'indexed': false,
                'name': 'burnedAmount',
                'type': 'uint256'
            } ],
            'name': 'Burned',
            'type': 'event'
        }, {
            'anonymous': false,
            'inputs': [ { 'indexed': true, 'name': 'from', 'type': 'address' }, {
                'indexed': true,
                'name': 'to',
                'type': 'address'
            }, { 'indexed': false, 'name': 'value', 'type': 'uint256' } ],
            'name': 'Transfer',
            'type': 'event'
        }, {
            'anonymous': false,
            'inputs': [ { 'indexed': true, 'name': 'owner', 'type': 'address' }, {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
            }, { 'indexed': false, 'name': 'value', 'type': 'uint256' } ],
            'name': 'Approval',
            'type': 'event'
        }
        ];
    const storjAddress = '0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC';
    const daoCasinoAbi = [
        {
            'constant': true,
            'inputs': [],
            'name': 'name',
            'outputs': [ { 'name': '', 'type': 'string' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': '_spender', 'type': 'address' }, { 'name': '_amount', 'type': 'uint256' } ],
            'name': 'approve',
            'outputs': [ { 'name': 'success', 'type': 'bool' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [ { 'name': 'totalSupply', 'type': 'uint256' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': '_from', 'type': 'address' }, {
                'name': '_to',
                'type': 'address'
            }, { 'name': '_amount', 'type': 'uint256' } ],
            'name': 'transferFrom',
            'outputs': [ { 'name': 'success', 'type': 'bool' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'decimals',
            'outputs': [ { 'name': '', 'type': 'uint8' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [],
            'name': 'seal',
            'outputs': [],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [ { 'name': '_owner', 'type': 'address' } ],
            'name': 'balanceOf',
            'outputs': [ { 'name': 'balance', 'type': 'uint256' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [],
            'name': 'acceptOwnership',
            'outputs': [],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': 'data', 'type': 'uint256[]' } ],
            'name': 'fill',
            'outputs': [],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [ { 'name': '', 'type': 'address' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'symbol',
            'outputs': [ { 'name': '', 'type': 'string' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': '_to', 'type': 'address' }, { 'name': '_amount', 'type': 'uint256' } ],
            'name': 'transfer',
            'outputs': [ { 'name': 'success', 'type': 'bool' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'newOwner',
            'outputs': [ { 'name': '', 'type': 'address' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': 'tokenAddress', 'type': 'address' }, { 'name': 'amount', 'type': 'uint256' } ],
            'name': 'transferAnyERC20Token',
            'outputs': [ { 'name': 'success', 'type': 'bool' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [ { 'name': '_owner', 'type': 'address' }, { 'name': '_spender', 'type': 'address' } ],
            'name': 'allowance',
            'outputs': [ { 'name': 'remaining', 'type': 'uint256' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': true,
            'inputs': [],
            'name': 'sealed',
            'outputs': [ { 'name': '', 'type': 'bool' } ],
            'payable': false,
            'type': 'function'
        }, {
            'constant': false,
            'inputs': [ { 'name': '_newOwner', 'type': 'address' } ],
            'name': 'transferOwnership',
            'outputs': [],
            'payable': false,
            'type': 'function'
        }, { 'inputs': [], 'payable': false, 'type': 'constructor' }, {
            'anonymous': false,
            'inputs': [ { 'indexed': true, 'name': '_from', 'type': 'address' }, {
                'indexed': true,
                'name': '_to',
                'type': 'address'
            } ],
            'name': 'OwnershipTransferred',
            'type': 'event'
        }, {
            'anonymous': false,
            'inputs': [ { 'indexed': true, 'name': '_from', 'type': 'address' }, {
                'indexed': true,
                'name': '_to',
                'type': 'address'
            }, { 'indexed': false, 'name': '_value', 'type': 'uint256' } ],
            'name': 'Transfer',
            'type': 'event'
        }, {
            'anonymous': false,
            'inputs': [ { 'indexed': true, 'name': '_owner', 'type': 'address' }, {
                'indexed': true,
                'name': '_spender',
                'type': 'address'
            }, { 'indexed': false, 'name': '_value', 'type': 'uint256' } ],
            'name': 'Approval',
            'type': 'event'
        } ];
    const daoCasinoAddress = '0x8aA33A7899FCC8eA5fBe6A608A109c3893A1B8b2';
    const contractsArray = [
        {
            abi: erc20Abi,
            address: storjAddress
        }, {
            abi: erc20Abi,
            address: daoCasinoAddress
        } ];

    function findSmartContract() {
        const contractAddress = document.getElementById('contractAddress').value;
        let contractAbi = document.getElementById('contractAbi').value;
        contractAbi = contractAbi ? JSON.parse(contractAbi.replace(/'/g, '"')) : undefined;
        // contractAbi = JSON.parse(contractAbi.replace(/'/g, '"'));

        outputContractDataByAddress(contractAddress, contractAbi);
    }

    function outputContractDataByAddress(address, abi = erc20Abi) {
        const contract = web3.eth.contract(abi).at(address);

        // const abiMethods = [
        //     { name: 'name' },
        //     { name: 'symbol' },
        //     { name: 'totalSupply' },
        //     { name: 'balanceOf', parameters: [ web3.eth.coinbase ] }
        // ];
        //
        // const abiGetters = abi.filter((item) => item.constant);

        document.getElementById('output-container').innerHTML = '';


        abi.forEach(({ name, inputs = [] }) => {

            if (!name) return;

            const resultNode = templates.propertyLine({ name, inputs });
            document.getElementById('output-container').appendChild(resultNode);

            if (inputs.length) { return; }

            contract[ name ].call((error, result) => {
                if (error) {
                    return console.error(`Something went wrong with "${name}": ${error}`)
                }

                resultNode.getElementsByClassName('result__'+name)[0].innerText = result;

            });
        });
    }
})();