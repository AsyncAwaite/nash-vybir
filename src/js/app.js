"use strict";
import * as flsFunctions from "./modules/functions.js";
import {header, footer} from "./modules/elements.js";
import burger from "./modules/burger.js";
import {scrollToAnchor} from "./modules/scrollToAnchor.js";
// import Modal from "./modules/modal.js";

import {getElement, getElements} from "./modules/helpers.js";

// import modalsEvents from "./modules/modalsEvents.js";

// import smoothHeight from "./modules/smoothHeight.js";
import flatpickr from "flatpickr";
import {Ukrainian} from "flatpickr/dist/l10n/uk.js";
import {Polish} from "flatpickr/dist/l10n/pl.js";
import Form from "./modules/Form.js";
import modalsEvents from "./modules/modalsEvents.js";
import Modal from "./modules/modal.js";
import dropdown from "./modules/dropdown.js";
import slider from "./modules/slider.js";

flsFunctions.isWebp();
document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
window.addEventListener('resize', function () {
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
});
window.addEventListener('scroll', function () {
    // scrollBar();
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
});
window.addEventListener("DOMContentLoaded", () => {
    try {


        burger();
        // headerFixed();
        dropdown();
        if (getElement('.form-search-event')) {
            new Form('.form-search-event').init();

        }
        if (getElement('.form-search')) {
            new Form('.form-search').init();

        }
        slider();
        //
        getElements('[data-target]').forEach(btn => {
            btn.addEventListener('click', () => {
                modalsEvents(btn);
                new Modal(".modal").openModal();
            })
        })


    } catch (e) {
        console.log(e);
    }
});


function headerFixed() {
    if (header) {
        if (scrollY >= header.clientHeight) {
            header.classList.add("--fixed");
        }
        window.addEventListener("scroll", () => {
            try {
                if (scrollY >= header.clientHeight) {
                    header.classList.add("--fixed");
                } else {
                    header.classList.remove("--fixed");
                }
            } catch (e) {
                console.log(e);
            }
        });

    }
}

//
function scrollBar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    getElement('#progress-bar').style.width = scrolled + "%";
}

