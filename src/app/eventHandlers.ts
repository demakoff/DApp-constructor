declare const DApp;

import { handle } from './errorHandler';
import { Contract } from './contract';
import { validateArgsByEvent } from './formValidation';
import { getTransformedArgs } from './helpers';

export const onCallMethod = (event: Event): void => {
    const methodName = (event.target as HTMLButtonElement).getAttribute('data-method-name');
    const argsNodes = document.querySelectorAll(`.result__${methodName} [data-arg-name]`);

    // TODO: export to helper
    const argsData = [].map.call(argsNodes, argNode => {
        argNode.classList.remove('invalid');
        return {
            name: argNode.getAttribute('data-arg-name'),
            type: argNode.getAttribute('data-arg-type'),
            value: argNode.value
        };
    });

    validateArgsByEvent(argsData, methodName)
        .then(getTransformedArgs.bind(null, methodName))
        .then(Contract.execute)
        .then(result => {
            document.querySelector(`.result__${methodName} [data-call-result]`)
                .innerHTML = JSON.stringify(result);
        })
        .catch(handle);
};
