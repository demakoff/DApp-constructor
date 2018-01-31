(function(){
    const dataTypesRegExp = {
        address: /^0x[0-9a-f]{40}$/i
    };

    window.DApp.formValidation = {
        validateArgsByEvent: validateArgsByEvent,
        dataTypesRegExp: dataTypesRegExp
    };

    function validateArgsByEvent(args, methodName) {
        return Promise.all(args.map(argNode => validateArg(argNode, methodName)));
    }

    function validateArg({ name, type, value }, methodName) {
            const validateRule = dataTypesRegExp[type];
            if (validateRule && !validateRule.test(value)) {
                throw {
                    type: 'argumentValidationError',
                    argName: name,
                    methodName
                };
            }
            return value;
    }
})();