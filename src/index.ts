import {
    findSmartContract,
    addToFavorite,
    fillFromFavorite,
    removeFromFavorite
} from './app/main';

(window as any).DApp = {
    findSmartContract,
    addToFavorite,
    fillFromFavorite,
    removeFromFavorite
};
