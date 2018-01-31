(function () {
    window.DApp.eventHandlers = {
        onCallMethod: onCallMethod
    };

    function onCallMethod(event) {
        const methodName = event.target.getAttribute('data-method-name');
        const argsNodes = document.querySelectorAll(`.result__${methodName} [data-arg-name]`);

        // TODO: export to helper
        const argsData = [].map.call(argsNodes, argNode => {
            argNode.classList.remove('invalid');
            return {
                name: argNode.getAttribute('data-arg-name'),
                type: argNode.getAttribute('data-arg-type'),
                value: argNode.value
            }
        });

        DApp.formValidation.validateArgsByEvent(argsData, methodName)
            .then(DApp.Contract.api.execute.bind(null, methodName))
            .then(result => {
                    document.querySelector(`.result__${methodName} [data-call-result]`)
                        .innerText = JSON.stringify(result);
                })
            .catch(DApp.errorHandler.handle);
    }
})();