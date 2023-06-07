
import {getElement} from "./helpers.js";

const header = document.querySelector("header");
const footer = document.querySelector('footer');
const modal = getElement('.modal');
const modalBody = modal.querySelector('.modal__body');
const scrollPosition = scrollY || document.documentElement.scrollTop;
export {

  header, modal, modalBody, footer, scrollPosition

};
