declare const web3;

const dataTypes = [
    'uint8...uint256',  // +
    'int8...int256',    // +
    'fixed8x1...fixed256x80',   // +
    'ufixed8x1...ufixed256x80',     // +
    'bytes1...bytes32', // +
    'bytes',    // +
    'address',  // +
    'function',     // bytes24 +
    'bool',     // +
    'string',   // +
    '...[]'
];

const typeParseRegExp = /^([a-z]+)(\d{0,3})?(?:x+(\d{1,2}))?(\[(\d*)?\])?$/;

const dataTypesValidation = {
    address: web3.isAddress,
    bool: /^([01])$/,
    uint: /^\d*$/,
    int: /^-?\d*$/,
    fixed: /^-?\d+(\.\d+)?$/,
    ufixed: /^\d+(\.\d+)?$/,
    bytes: /^0x[abcdef0-9]{2,64}$/i,
    'function': /^0x[abcdef0-9]{48}$/i
};

export const isValidAddress = (address: string): boolean => {
    return dataTypesValidation.address(address);
};

export const validateArgsByEvent = (args, methodName): Promise<any> => Promise.all(
    args.map(argNode => validateArg(argNode, methodName))
);

const validateArg = ({ name, type, value }, methodName): any => new Promise((resolve, reject) => {
    if (!isValueValid(type, value)) {
        reject({
            type: 'argumentValidationError',
            argName: name,
            methodName
        });
    }
    resolve({ value, type });
});

const isValueValid = (type: string, value: string): boolean => {
    const validateRule = getValidationRuleByType(type);
    if (!validateRule) return true;
    if (validateRule instanceof RegExp) {
        return validateRule.test(value);
    }
    if (validateRule instanceof Function) {
        return validateRule(value);
    }
};

const getValidationRuleByType = (type: string): any => {
    const [, dataType, size, decimals, isArray, arrayLength] = type.match(typeParseRegExp);
    return !!isArray ? false : dataTypesValidation[dataType];
};
