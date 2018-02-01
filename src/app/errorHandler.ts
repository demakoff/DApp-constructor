export const handle = (error = {} as any): void => {
    if (error.type === 'argumentValidationError') {
        const methodNode = document.querySelector(`.result__${error.methodName}`);
        const argNode = methodNode.querySelector(`[data-arg-name="${error.argName}"]`);
        argNode.classList.add('invalid');
    }
    console.error(error);
};
