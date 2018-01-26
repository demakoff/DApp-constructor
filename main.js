(function() {
    window.findSmartContract = findSmartContract;
    window.addToFavorite = addToFavorite;
    window.fillFromFavorite = fillFromFavorite;
    window.removeFromFavorite = removeFromFavorite;

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

    const dataTypesRegExp = {
        address: /^0x[0-9a-f]{40}$/i
    };

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
                    'name': '_receiver',
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
    const daoCasinoAddress = '0x8aA33A7899FCC8eA5fBe6A608A109c3893A1B8b2';

    let contract;

    init();

    function init() {
        updateFavorites();
    }

    function updateFavorites() {
        const favoriteContracts = JSON.parse(localStorage.getItem('favoriteContracts'));
        let favoriteContainer = document.querySelector('[data-favor-container]');
        favoriteContainer.innerHTML = '';

        favoriteContracts.forEach((favContract) => {
            const liNode = document.createElement('li');
            liNode.innerHTML = `${favContract.name} 
                        <button 
                            type="button"
                            onClick="fillFromFavorite('${favContract.address}');"
                            class="btn btn-info btn-sm">Use it
                        </button>
                        <button 
                            type="button"
                            onClick="removeFromFavorite('${favContract.address}');"
                            class="btn btn-info btn-sm">Remove
                        </button>`;
            favoriteContainer.appendChild(liNode);
        });
    }

    function findSmartContract() {
        document.querySelector('[data-contract-address]').classList.remove('invalid');
        document.querySelector('[data-output-container]').innerHTML = '';
        const contractAddress = document.querySelector('[data-contract-address]').value;

        if (!dataTypesRegExp.address.test(contractAddress)) {
            document.querySelector('[data-contract-address]').classList.add('invalid');
            return;
        }

        let contractAbi = document.querySelector('[data-contract-abi]').value;
        contractAbi = contractAbi ? JSON.parse(contractAbi.replace(/'/g, '"')) : erc20Abi;
        // contract = web3.eth.contract(contractAbi).at(contractAddress);
        Contract(contractAbi, contractAddress);

        outputContractData(contractAbi);
    }

    function outputContractData(abi) {

        abi.forEach((methodAbi) => {
            const { name, inputs = [] } = methodAbi;

            if (!name) return;  // filter out events, fallback etc from ABI

            const resultNode = templates.getPropertyLine(methodAbi);
            document.querySelector('[data-output-container]').appendChild(resultNode);

            if (inputs.length) { return; }

            Contract.api.callContractMethod(name);
        });

        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll('button[data-method-name]').forEach((button) => {
            button.addEventListener('click', (e) => {
                let methodName = e.target.getAttribute('data-method-name');
                let isMethodConstant = e.target.getAttribute('data-method-constant');
                let args = document.querySelectorAll(`.result__${methodName} [data-arg-name]`);
                let argsValues = [];
                let valid = true;
                args.forEach((arg) => {
                    arg.classList.remove('invalid');
                    const argType = arg.getAttribute('data-arg-type');
                    const validateRule = dataTypesRegExp[argType];
                    if (validateRule && !validateRule.test(arg.value)) {
                        valid = false;
                        arg.classList.add('invalid');
                    }
                    return argsValues.push(arg.value)
                });

                if (isMethodConstant === 'true') {
                    valid && Contract.api.callContractMethod(methodName, argsValues);
                } else {
                    valid && Contract.api.createMethodTransaction(methodName, argsValues);
                }
            })
        })
    }

    function addToFavorite() {
        const address = document.querySelector('[data-contract-address]').value;
        const abi = document.querySelector('[data-contract-abi]').value;
        let favoriteContracts = JSON.parse(localStorage.getItem('favoriteContracts')) || [];
        const duplicate = favoriteContracts.find((item) => item.address === address);
        if (duplicate) {
            return alert('This address already in favorite');
        }
        const name = prompt('Please enter contract name');
        if (!name) return;
        favoriteContracts.push({ name, address, abi });
        localStorage.setItem('favoriteContracts', JSON.stringify(favoriteContracts));
        updateFavorites();
    }

    function fillFromFavorite(favoriteAddress) {
        let favoriteContracts = JSON.parse(localStorage.getItem('favoriteContracts'));
        const contractToFill = favoriteContracts.find((item) => item.address === favoriteAddress);
        document.querySelector('[data-contract-address]').value = contractToFill.address;
        document.querySelector('[data-contract-abi]').value = contractToFill.abi;
    }

    function removeFromFavorite(favoriteAddress){
        let favoriteContracts = JSON.parse(localStorage.getItem('favoriteContracts'));
        const contractToRewrite = favoriteContracts.filter((item) => item.address !== favoriteAddress);
        localStorage.setItem('favoriteContracts', JSON.stringify(contractToRewrite));
        updateFavorites();
    }
})();