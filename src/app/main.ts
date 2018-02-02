import * as erc20Abi from '../constants/erc20.abi.json';
import * as storjAbi from '../constants/storj.abi.json';

import { onCallMethod } from './eventHandlers';
import { isValidAddress } from './formValidation';
import { getPropertyLine } from './templates';
import { Contract } from './contract';

const storjAddress = '0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC';
const daoCasinoAddress = '0x8aA33A7899FCC8eA5fBe6A608A109c3893A1B8b2';

declare const DApp;

init();
function init() {
    updateFavorites();
}

export function findSmartContract() {
    document.querySelector('[data-contract-address]').classList.remove('invalid');
    document.querySelector('[data-output-container]').innerHTML = '';
    const contractAddress = inputAddress();

    if (!isValidAddress(contractAddress)) {
        document.querySelector('[data-contract-address]').classList.add('invalid');
        return;
    }

    let contractAbi = inputAbi();
    contractAbi = contractAbi ? JSON.parse(contractAbi.replace(/'/g, '"')) : erc20Abi;
    Contract(contractAbi, contractAddress);

    outputContractData(contractAbi);
}


export function addToFavorite() {
    const address = inputAddress();
    const abi = inputAbi();
    const favoriteContracts = JSON.parse(localStorage.getItem('favoriteContracts')) || [];
    const duplicate = favoriteContracts.find((item) => item.address === address);
    if (duplicate) {
        return alert('This address already in favorite');
    }
    const name = prompt('Please enter contract name');
    if (!name) {
        return;
    }
    favoriteContracts.push({ name, address, abi });
    localStorage.setItem('favoriteContracts', JSON.stringify(favoriteContracts));
    updateFavorites();
}

export function fillFromFavorite(favoriteAddress) {
    const favoriteContracts = JSON.parse(localStorage.getItem('favoriteContracts'));
    const contractToFill = favoriteContracts.find((item) => item.address === favoriteAddress);
    inputAbi(contractToFill.abi);
    inputAddress(contractToFill.address);
}

export function removeFromFavorite(favoriteAddress) {
    const favoriteContracts = JSON.parse(localStorage.getItem('favoriteContracts'));
    const contractToRewrite = favoriteContracts.filter((item) => item.address !== favoriteAddress);
    localStorage.setItem('favoriteContracts', JSON.stringify(contractToRewrite));
    updateFavorites();
}

function updateFavorites() {
    const favoriteContracts = JSON.parse(localStorage.getItem('favoriteContracts'));
    const favoriteContainer = document.querySelector('[data-favor-container]');
    favoriteContainer.innerHTML = '';

    favoriteContracts.forEach((favContract) => {
        const liNode = document.createElement('li');
        liNode.innerHTML = `${favContract.name} 
                        <button 
                            type="button"
                            onClick="DApp.fillFromFavorite('${favContract.address}');"
                            class="btn btn-info btn-sm">Use it
                        </button>
                        <button 
                            type="button"
                            onClick="DApp.removeFromFavorite('${favContract.address}');"
                            class="btn btn-info btn-sm">Remove
                        </button>`;
        favoriteContainer.appendChild(liNode);
    });
}

function outputContractData(abi) {

    abi.forEach((methodAbi) => {
        const { name, inputs = [] } = methodAbi;

        if (!name) { return; }  // filter out events, fallback etc from ABI

        const resultNode = getPropertyLine(methodAbi);
        document.querySelector('[data-output-container]').appendChild(resultNode);

        if (inputs.length) { return; }

        Contract.read(name)
            .then(
                result => { document.querySelector(`.result__${name} [data-call-result]`).innerHTML = result; },
                error => console.error(`Something went wrong with "${name}": ${error}`)
            );
    });

    addEventListeners();
}

function addEventListeners() {
    document.querySelectorAll('button[data-method-name]').forEach((button) => {
        button.addEventListener('click', onCallMethod);
    });
}

function inputAddress(value?: string): string {
    return inputValue('[data-contract-address]', value);
}

function inputAbi(value?: string): string {
    return inputValue('[data-contract-abi]', value);
}

function inputValue(selectors: string, value?: string): string {
    return value
        ? (document.querySelector(selectors) as HTMLTextAreaElement | HTMLInputElement).value = value
        : (document.querySelector(selectors) as HTMLTextAreaElement | HTMLInputElement).value;
}
