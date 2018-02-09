import { IExecuteParams } from './entities';

export const polling = (signal, interval, limit): Promise<any> => {
    return Promise.resolve(signal())
        .then(result => result
            ? result
            : new Promise((resolve, reject) => {
                setTimeout(() => {
                    limit < 0
                        ? reject('Polling waiting limit has been exceeded')
                        : polling(signal, interval, limit - interval)
                            .then(resolve)
                            .catch(reject);
                }, interval);
            })
        );
};

export const getTransformedArgs = (methodName: string, args: any[]): IExecuteParams => {
    return {
        name: methodName,
        args: args.reduce((mem, oneArg) => {
            if (oneArg.type !== 'payable') {
                mem.push(oneArg.value);
            }
            return mem;
        }, []),
        options: {
            value: +args.find(oneArg => oneArg.type == 'payable')['value']
        }
    }
};
