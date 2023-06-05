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
        if (getElement('.form-add-event')) {
            new Form('.form-add-event').init();
        }
        flatpickr(getElement('[data-form-date]'), {
            // plugins: [
            //     new yearDropdownPlugin({
            //         date: this.value,
            //         yearStart: this.yearStart,
            //         yearEnd: this.yearEnd
            //     })
            // ],
            altInput: true,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            disableMobile: true,
            monthSelectorType: 'static',
            yearSelectorType: 'scroll',
            minDate: "today",
            // defaultDate: 'today',

            // locale: "ua",
            // inline: true,
            // appendTo: this.date.parentElement,
            static: true,
            // locale: 'ru',
            locale: "uk",


            // locale: {
            //     locale: 'uk',
            //     firstDayOfWeek: 1 // 1 represents Monday
            // },
            // defaultDate: 'today',
            // minDate: firstDayOfMonth,
            // maxDate: lastDayOfMonth,
            onReady: function (selectedDates, dateStr, instance) {
                console.log(this)
                // // Get all the calendar days
                // const days = instance.calendarContainer.querySelectorAll('.flatpickr-day');
                //
                // // Remove the "today" class from the current date
                // for (let i = 0; i < days.length; i++) {
                //     if (days[i].classList.contains('today')) {
                //         days[i].classList.remove('today');
                //         days[i].classList.add('selected');
                //     }
                // }

            },
            onChange: function (selectedDates, dateStr, instance) {

                // this._input.offsetParent.querySelector('.form-section').querySelector('[name="date"]').value = instance.calendarContainer.querySelector('.selected').ariaLabel;
                // const days = instance.calendarContainer.querySelectorAll('.flatpickr-day');
                // days.forEach(day => {
                //     if (day.classList.contains('today')) {
                //         day.classList.remove('today');
                //     }
                // })
            }
        });
        burger();
        // headerFixed();

        //
        // getElements('[data-target]').forEach(btn => {
        //     btn.addEventListener('click', () => {
        //         modalsEvents(btn);
        //         new Modal(".modal").openModal();
        //     })
        // })


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
