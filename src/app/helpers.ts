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
