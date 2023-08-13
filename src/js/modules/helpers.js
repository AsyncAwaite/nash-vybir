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

function getElement(selector, parent = document) {
    return parent.querySelector(selector);
}

function getElements(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

function parseDateFromString(dateString) {

    const dateParts = dateString.split(' - ');
    let datePart = dateParts[0];
    if (dateParts.length > 1) {
        datePart = dateParts[1];
    }
    if (datePart.includes(' ')){
        datePart = datePart.split(' ')[0]
    }
    const [year, month, day,] = datePart.split('-');
    const parsedDate = new Date(year, month - 1, day);

    return parsedDate;
}


export {
    lenghtCorrect,
    arrayToChunks,
    removeActive,
    getElements,
    getElement,
    enableScrollAndSwipes,
    disableScrollAndSwipes, parseDateFromString
};