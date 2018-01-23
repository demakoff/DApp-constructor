(function(){

    function getPropertyLine(args){
        let template = `<div class='col-sm-4'>
                        <strong>${args.name} :</strong>
                    </div>
                    <div class='col-sm-8 method_args'>
                        <div class="result__${args.name}">
                            <div data-args-container></div>
                            <div data-call-result></div>
                        </div>                        
                    </div>`;

        const resultNode = document.createElement('div');
        resultNode.className = 'row method';
        resultNode.innerHTML = template;

        let resultElementNode = resultNode.querySelector(`.result__${args.name} [data-args-container]`);
        args.inputs.forEach((input) => {
            const inputNode = document.createElement('div');
            inputNode.innerHTML = `<input data-arg-name="${input.name}" placeholder="${input.name} ${input.type}">`;
            resultElementNode.appendChild(inputNode);
        });

        if (args.inputs.length) {
            const buttonNode = document.createElement('button');
            buttonNode.setAttribute('type', 'button');
            buttonNode.setAttribute('data-method-name', args.name);
            buttonNode.classList.add("btn");
            buttonNode.classList.add("btn-info");
            buttonNode.innerText = "Call with args";
            resultElementNode.appendChild(buttonNode);
        }

        return resultNode;
    }

    window.templates = {
        getPropertyLine: getPropertyLine
    };
})();