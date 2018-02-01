const dataTypesRegExp = {
    address: /^0x[0-9a-f]{40}$/i
};

export const isValidAddress = (address: string): boolean => {
    return dataTypesRegExp.address.test(address);
};

export const validateArgsByEvent = (args, methodName): Promise<any> => Promise.all(
    args.map(argNode => validateArg(argNode, methodName))
);

export const validateArg = ({ name, type, value }, methodName): any => {
    const validateRule = dataTypesRegExp[type];
    if (validateRule && !validateRule.test(value)) {
        throw {
            type: 'argumentValidationError',
            argName: name,
            methodName
        };
    }
    return value;
};
