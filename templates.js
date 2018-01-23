(function(){

    function propertyLine(args){
        let template = `<div class='col-sm-4'>
                        <strong>${args.name} :</strong>
                    </div>
                    <div class='col-sm-8'>
                        <div class="result__${args.name}"></div>
                    </div>`;

        const resultNode = document.createElement('div');
        resultNode.className = 'row';
        resultNode.innerHTML = template;

        args.inputs.forEach((input) => {
            let resultElementNode = resultNode.getElementsByClassName('result__'+args.name)[0];
            const inputNode = document.createElement('div');
            inputNode.innerHTML = `<input placeholder="${input.name} ${input.type}">`;
            resultElementNode.appendChild(inputNode);
        });

        return resultNode;
    }

    window.templates = {
        propertyLine: propertyLine
    };
})();