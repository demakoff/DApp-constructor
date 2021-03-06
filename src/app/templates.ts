export function getPropertyLine(methodAbi) {
    const template = `<div class='col-sm-4'>
                        <strong>${methodAbi.name} :</strong>
                    </div>
                    <div class='col-sm-8 method_args'>
                        <div class="result__${methodAbi.name}">
                            <div data-args-container></div>
                            <div data-call-button></div>
                            <div data-call-result></div>
                        </div>                        
                    </div>`;

    const resultNode = document.createElement('div');
    resultNode.className = 'row method';
    resultNode.innerHTML = template;

    const resultElementNode = resultNode.querySelector(`.result__${methodAbi.name} [data-args-container]`);
    if (methodAbi.payable) {
        const inputNode = document.createElement('div');
        inputNode.innerHTML = `<input data-arg-name="payable" 
                                        data-arg-type="payable"
                                        class="form-control"
                                        placeholder="Amount of Ether in Wei to pay">`;
        resultElementNode.appendChild(inputNode);
    }

    methodAbi.inputs.forEach((input) => {
        const inputNode = document.createElement('div');
        inputNode.innerHTML = `<input data-arg-name="${input.name}" 
                                        data-arg-type="${input.type}"
                                        class="form-control"
                                        placeholder="${input.name} ${input.type}">`;
        resultElementNode.appendChild(inputNode);
    });

    if (methodAbi.inputs.length || methodAbi.payable) {
        const callButtonNode = resultNode.querySelector(`.result__${methodAbi.name} [data-call-button]`);
        callButtonNode.innerHTML = `<button 
                                        type="button" 
                                        data-method-name="${methodAbi.name}" 
                                        data-method-constant="${methodAbi.constant}"
                                        class="btn btn-info">Call with args
                                    </button>`;
    }

    return resultNode;
}