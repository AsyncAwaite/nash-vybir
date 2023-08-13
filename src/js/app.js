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
import pages from "./pages/pages.js";
import {eventsContainer, renderFilteredEvents} from "./pages/mainPageEvents.js";

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
        const uploadPostsBtns = getElements('[data-upload-events]');
        if (uploadPostsBtns.length) {
            let offset = 0;
            let events = null
            uploadPostsBtns.forEach(uploadBtn => {
                uploadBtn.addEventListener('click', async () => {
                    offset += 13;
                    uploadBtn.classList.add("disabled");
                    uploadBtn.dataset.text = uploadBtn.firstElementChild.innerHTML
                    uploadBtn.firstElementChild.innerHTML = 'Завантаження...'
                    try {
                        events = await get_events(offset);
                        if (events) {
                            if (events.length < 13) {
                                uploadBtn.classList.add('none');
                            }
                            uploadBtn.insertAdjacentHTML('beforebegin', renderFilteredEvents(events));
                            uploadBtn.firstElementChild.innerHTML = uploadBtn.dataset.text;
                            uploadBtn.classList.remove("disabled");
                            events = null;
                        } else {
                            uploadBtn.firstElementChild.innerHTML = 'Виникла помилка';
                            setTimeout(() => {
                                uploadBtn.classList.remove("disabled");
                                uploadBtn.firstElementChild.innerHTML = uploadBtn.dataset.text;
                            }, 500)

                        }
                    } catch (e) {
                        console.log(e)
                    }


                })
            })

        }
        burger();
        dropdown();
        pages()
        if (getElement('.form-calendar')) {
            new Form('.form-calendar').init();

        }
        if (getElement('.form-search')) {
            new Form('.form-search').init();

        }

        if (getElement('.profile-form')) {
            if (getElement('.form-contact')) {
                new Form('.form-contact').init();
            }
            if (getElement('.form-subscribe')) {
                new Form('.form-subscribe').init();
            }
        }
        slider();
        // console.log(grecaptcha.getResponse())
        getElements('[data-target]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.target == 'logout') {
                    logout();
                    return
                } else {
                    modalsEvents(btn);
                    new Modal(".modal").openModal();
                }

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

async function logout() {
    const data = new FormData();
    data.append(`action`, `custom_user_logout`);
    try {
        const response = await fetch(ajax_url, {
            method: "POST",
            body: data,
        });
        const result = await response.json();
        if (result.success) {
            location.reload();
        }

    } catch (error) {

        console.error("Ошибка:", error);
    }

}

function scrollBar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    getElement('#progress-bar').style.width = scrolled + "%";
}

async function get_events(offset) {
    try {
        const data = new FormData();
        data.append('action', 'dn_ajax_get_events');
        data.append('offset', offset);

        const response = await fetch(ajax_url, {
            method: "POST",
            body: data,
        });
        let result = await response.json();
        if (result) {
            return result;
        }
    } catch (e) {
        console.log(e)
    }
}