(function(){
    const dataTypesRegExp = {
        address: /^0x[0-9a-f]{40}$/i
    };

    window.DApp.formValidation = {
        validateArgsByEvent: validateArgsByEvent,
        dataTypesRegExp: dataTypesRegExp
    };

    function validateArgsByEvent(args, methodName) {
        let resultPromise = Promise.resolve([]);

        args.forEach((argNode) => {
            resultPromise = resultPromise.then(validateArg.bind(this, argNode, methodName));
        });
        return resultPromise;
    }

    function validateArg({ name, type, value }, methodName, argsValues) {
            const validateRule = dataTypesRegExp[type];
            if (validateRule && !validateRule.test(value)) {
                throw {
                    type: 'argumentValidationError',
                    argName: name,
                    methodName
                };
            }
            argsValues.push(value);
            return argsValues;
    }
})();