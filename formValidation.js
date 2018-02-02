(function () {
    const dataTypes = [
        'uint8...uint256',  // +
        'int8...int256',    // +
        'fixed8x1...fixed256x80',   // +
        'ufixed8x1...ufixed256x80',     // +
        'bytes1...bytes32',
        'bytes',
        'address',  // +
        'function',
        'bool',     // +
        'string',
        '...[]'
    ];

    const typeParceRegExp = /^([a-z]+)(\d{0,3})?(?:x+(\d{1,2}))?(\[(\d*)?\])?$/;

    const dataTypesRegExp = {
        uints: /^uint\d{0,3}$/,
        ints: /^int\d{0,3}$/,
        fixeds: /^fixed\d{1,3}x\d{1,2}$/,
        ufixeds: /^ufixed\d{1,3}x\d{1,2}$/,
        bytes: /^bytes?\d{0,2}$/
    };

    const dataTypesValidation = {
        address: web3.isAddress,
        bool: /^(true|false)$/,
        uints: /^\d*$/,
        ints: /^-?\d*$/,
        fixeds: /^-?\d+(\.\d+)?$/,
        ufixeds: /^\d+(\.\d+)?$/
    };

    window.DApp.formValidation = {
        validateArgsByEvent: validateArgsByEvent,
        dataTypesValidation: dataTypesValidation
    };

    function validateArgsByEvent(args, methodName) {
        return Promise.all(args.map(argNode => validateArg(argNode, methodName)));
    }

    function validateArg({ name, type, value }, methodName) {
        return new Promise((resolve, reject) => {
            if (!isValueValid(type, value)) {
                reject({
                    type: 'argumentValidationError',
                    argName: name,
                    methodName
                });
            }
            resolve(value);
        })
    }

    function isValueValid(type, value) {
        const validateRule = getValidationRuleByType(type);
        if (!validateRule) return true;
        if (validateRule instanceof RegExp) {
            return validateRule.test(value);
        }
        if (validateRule instanceof Function) {
            return validateRule(value);
        }
    }

    function getValidationRuleByType(type) {
        if (dataTypesRegExp.uints.test(type)) {
            return dataTypesValidation.uints;
        } else if (dataTypesRegExp.ints.test(type)) {
            return dataTypesValidation.ints;
        } else {
            return dataTypesValidation[ type ];
        }
    }
})();