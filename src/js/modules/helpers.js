import {scrollPosition} from "./elements.js";

function disableScrollAndSwipes() {
    document.body.style.position = 'fixed';
    console.log(scrollPosition)
    document.body.style.top = `-${scrollPosition}px`;
}

function enableScrollAndSwipes() {
    document.body.style.position = 'relative';
    document.body.style.top = '0';
    window.scrollTo(0, scrollPosition);

}

function lenghtCorrect(title, size) {

    if (title.length > size) {
        title = title.substr(0, size) + `...`;
        return title;
    } else {
        return title;
    }

}

function arrayToChunks(size, arr) {

    const arrCopy = [...arr];
    let newArr = [];

    for (let i = 0; i < Math.ceil(arrCopy.length / size); i++) {
        newArr[i] = arrCopy.slice(i * size, i * size + size);
    }
    return newArr
}

function removeActive(arr) {
    arr.forEach((item) => {
        item.classList.remove("active");
    });
}

function getElement(selector) {
    return document.querySelector(selector);
}

function getElements(selector) {
    return document.querySelectorAll(selector);
}


export {
    lenghtCorrect,
    arrayToChunks,
    removeActive,
    getElements,
    getElement,
    enableScrollAndSwipes,
    disableScrollAndSwipes
};