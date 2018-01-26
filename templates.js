(function(){

    function getPropertyLine(args){
        let template = `<div class='col-sm-4'>
                        <strong>${args.name} :</strong>
                    </div>
                    <div class='col-sm-8 method_args'>
                        <div class="result__${args.name}">
                            <div data-args-container></div>
                            <div data-call-button></div>
                            <div data-call-result></div>
                        </div>                        
                    </div>`;

        const resultNode = document.createElement('div');
        resultNode.className = 'row method';
        resultNode.innerHTML = template;

        let resultElementNode = resultNode.querySelector(`.result__${args.name} [data-args-container]`);
        args.inputs.forEach((input) => {
            const inputNode = document.createElement('div');
            inputNode.innerHTML = `<input data-arg-name="${input.name}" 
                                        data-arg-type="${input.type}"
                                        class="form-control"
                                        placeholder="${input.name} ${input.type}">`;
            resultElementNode.appendChild(inputNode);
        });

        if (args.inputs.length) {
            let callButtonNode = resultNode.querySelector(`.result__${args.name} [data-call-button]`);
            callButtonNode.innerHTML = `<button 
                                            type="button" 
                                            data-method-name="${args.name}" 
                                            data-method-constant="${args.constant}"
                                            class="btn btn-info">Call with args
                                        </button>`;
        }

        return resultNode;
    }

    window.templates = {
        getPropertyLine: getPropertyLine
    };
})();