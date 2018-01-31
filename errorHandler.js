(function() {
    window.DApp.errorHandler = {
        handle: handle
    };

    function handle(error = {}) {
        if (error.type === 'argumentValidationError') {
            let methodNode = document.querySelector(`.result__${error.methodName}`);
            const argNode = methodNode.querySelector(`[data-arg-name="${error.argName}"]`);
            argNode.classList.add('invalid');
        }
    }

})();