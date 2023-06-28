import IMask from "imask";
import modalsEvents from "./modalsEvents.js";
import Modal from "./modal.js";
import {translateFields, lang} from "./base.js";
import {getElement} from "./helpers.js";
import flatpickr from "flatpickr";

let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const content = {
    field: {
        en: "This field is required",
        ua: "Поле обов'язкове для заповнення",
    },
    template: {
        en: "Fill in according to the template",
        ua: "Заповніть відповідно до шаблону",
    },
    send: {
        en: "Send",
        ua: "Відправити",
    },
    surname: {
        en: "Enter the surname:",
        ua: `Введіть прізвище`,
    },

    email: {
        en: "Fill in according to the template: test@tect.com",
        ua: `Заповніть відповідно до шаблону: test@tect.com`,
    },
    rate: {
        en: "Fill in according to the template: test@tect.com",
        ua: `Сума має бути більшою за запропоновану`,
    },


    thankTitle: {
        en: "Дякуємо, ми зв'яжемося з Вами найближчим часом!",
        ua: "Дякуємо, ми зв'яжемося з Вами найближчим часом!",
    },
};
let maskOptions = {
    mask: "+1 (000) 000 - 0000",
    lazy: false,
};

class Form {
    constructor(form) {
        this.form = document.querySelector(form);
        this.inputs = this.form.querySelectorAll("input");
        this.path = `assets/services/telegramSend.php`;
        this.search = this.form.querySelector("[data-search]") ? this.form.querySelector("[data-search]") : null;
        // this.path = `${path}/assets/services/telegramSend.php`;
        // this.authPath = `${path}/assets/services/sendPulse.php`;
        this.date = this.form.querySelector('[data-form-date]') ? this.form.querySelector('[data-form-date]') : null;
        this.telInput = this.form.querySelector("[name='phone']") ? this.form.querySelector("[name='phone']") : this.form.querySelector('.tel')
        this.mask = this.telInput ? new IMask(this.telInput, maskOptions) : null;
        this.textarea = this.form.querySelector('textarea') ? this.form.querySelector('textarea') : null;
        this.formData = {
            title: '',
            phone: "",
            surname: "",
            name: "",
            email: "",
            region: '',
            work: '',
            role: '',
            organisation: '',
            link: location.href
        };
    }

    showSearchInput() {
        if (!this.search) return;
        const searchBtn = this.search.querySelector('.search-item__btn');
        let isFind = false;
        if (screen.width >= 993) {
            searchBtn.addEventListener('click', () => {

                if (isFind) {
                    this.search.classList.remove('find');
                    setTimeout(() => {
                        this.search.classList.remove('active');
                    }, 300)
                    isFind = false;
                    return;
                } else {
                    this.search.classList.add('active');
                    setTimeout(() => {

                        this.search.classList.add('find');
                        isFind = true;


                    }, 300)
                }

            })
        }


    }

    formItemsEvents() {
        this.showSearchInput();
    }

    createMask(input) {
        let maskOptions = {
            mask: "+1 (000) 000 - 0000",
            lazy: false,
        };
        let mask = new IMask(input, maskOptions);
        mask.updateValue();
    }

    checkInputs() {

        this.inputs.forEach((input) => {
            if (input.name === "name") {
                this.checkNameInput(input);
            }

            if (input.name === "tel") {

                this.checkPhoneInput(input);
            }

            if (input.name === 'email') {
                this.checkEmailInput(input)
            }


        });
        // if (this.textarea) {
        //     this.textarea.addEventListener('input', () => {
        //         console.log(this.textarea.value)
        //     })
        // }
    }

    resetForm(btn) {
        this.formData = {
            title: '',
            phone: "",
            surname: "",
            name: "",
            email: "",
            link: location.href
        };
        let {send: {ua, en}} = content;
        btn.dataset.form = '';
        btn.classList.remove("disabled");
        btn.innerHTML = `<span class="txt-upper">${!isEn ? ua : en}</span>`;
        this.form.reset();
        if (this.form.dataset.formQuestion) return;
        this.inputs.forEach((input) => {
            input.parentNode.classList = "form__item";
            input.value = '';
            if (input.name == 'tel') {
                this.mask.updateValue();
            }
        });
        this.checkInputs();
    }

    checkEmailInput(input) {
        let {email: emailInput} = translateFields;
        let email = emailInput[lang];
        let isValid = false;

        input.addEventListener("input", () => {
            if (input.value.match(validRegex)) {
                this.valid(input);
                isValid = true;
                this.formData.email = input.value;
            } else {
                this.invalid(input);
                isValid = false;
            }
            if (!isValid) {
                input.nextElementSibling.innerHTML = `${
                    email
                }`;
            } else {
                input.nextElementSibling.innerText = "";
            }
        });
    }

    checkPhoneInput(input) {
        let {template: templateMessage} = translateFields;
        let template = templateMessage[lang];
        let isValid = false;
        this.mask.updateValue()

        input.addEventListener("input", () => {
            if (input.value.indexOf("_") === -1) {
                this.valid(input);
                this.formData.phone = input.value.substr(1);
                isValid = true;
            } else {
                this.invalid(input);
                isValid = false;
            }
            if (!isValid) {
                input.nextElementSibling.innerHTML = `${template}`;
            } else {
                input.nextElementSibling.innerText = "";
            }
        });
    }


    checkRateInput(input) {
        let {rate: {en, ua}} = content;
        let rate = !isEn ? ua : en
        let isValid = false;
        const value = +input.value
        input.addEventListener('input', () => {
            if (+input.value < value) {
                this.invalid(input);
                isValid = false;
            } else {
                this.valid(input);
                isValid = true;
            }
            input.nextElementSibling.nextElementSibling.innerHTML = !isValid ? rate : '';
        })

    }

    valid(input) {
        input.closest('.form__item').classList.add("valid");
        input.closest('.form__item').classList.remove("invalid");
        if (this.form.querySelector('.btn').classList.contains('disabled')) this.form.querySelector('.btn').classList.remove('disabled')
    }

    invalid(input) {
        input.closest('.form__item').classList.add("invalid");
        input.closest('.form__item').classList.remove("valid");
        this.form.querySelector('.btn').classList.add('disabled')
    }

    validateEmptyField() {
        let {field} = translateFields;

        let isValid = true;
        if (this.form.dataset.form == 'rate') return isValid;
        let validator = {
            name: null,
            tel: null,
            surname: null,
            email: null
        };
        let validInputs = false;
        this.inputs.forEach((input) => {

            if (input.name === "name" || input.name === "surname") {
                if (!input.value.trim()) {
                    input.closest('.form__item').classList.add("invalid");
                    input.nextElementSibling.innerHTML = `${
                        field[lang]
                    }`;
                    return (isValid = false);
                } else {
                    this.valid(input);
                    input.nextElementSibling.innerText = "";

                    validator[input.name] = true;
                    return (isValid = true);
                }
            } else if (input.name === "tel") {
                if (input.value.indexOf("_") === -1) {
                    this.valid(input);
                    input.nextElementSibling.innerText = "";
                    validator.tel = true;
                    return (isValid = true);
                } else {
                    input.closest('.form__item').classList.add("invalid");
                    input.nextElementSibling.innerHTML = `${
                        field[lang]
                    }`;

                    validator.tel = false;
                    return (isValid = false);
                }
            } else if (input.name === "email") {
                if (!input.value.match(validRegex)) {
                    input.closest('.form__item').classList.add("invalid");
                    input.nextElementSibling.innerHTML = `${
                        field[lang]
                    }`;
                    return (isValid = false);
                } else {
                    this.valid(input);
                    input.nextElementSibling.innerText = "";

                    validator.email = true;
                    return (isValid = true);
                }
            }
        });
        for (let key in validator) {
            if (!validator[key]) return validInputs = false;
            validInputs = true;
        }
        if (validInputs) {
            return isValid;
        }


    }

    async sendToSheet(data) {
        try {
            const sheetsData = new FormData();
            for (let key in data) {
                sheetsData.append(`${key}`, `${data[key]}`);
            }
            const result = await fetch(
                "https://script.google.com/macros/s/AKfycbwFLvu7MShp9xsydD7exK7pLzre6plmHZWocCt94Xzsy_6KCvGWnk37WJqPBgQEzX1E/exec",
                {
                    method: "POST",
                    body: sheetsData,
                }
            );
            console.log(result)
        } catch (e) {
            console.log(e);
        }


    }


    async postData(url, data, btn) {
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //
            if (this.form.dataset.formQuestion) {
                btn.dataset.form = 'success';
                modalsEvents(btn);
                new Modal(".modal__form-answer").openModal();
                this.resetForm(btn);
            } else {

                location.href = `${location.origin}/thank-you`


            }


        } catch (error) {
            btn.dataset.form = 'erorr';
            modalsEvents(btn);
            new Modal(".modal__form-answer").openModal();
            this.resetForm(btn);

            console.error("Ошибка:", error);
        }
    }

    getUtmParameter(url, object) {
        if (url) {
            let urlValues;
            urlValues = url.substr(1).split("&");

            const values = urlValues.map((value) => value.split("="));
            values.forEach((item) => {
                const regex = /utm_/i;
                let name = item[0].replace(regex, "");
                object[`${name}`] = item[1]
            });
            return true;
        }
        return false;
    };

    checkNameInput(input) {
        // let name = !isEn ? content[input.name].ua : content[input.name].en;
        //TODO
        let {name: nameInput} = translateFields;
        let name = nameInput[lang];
        let isValid = false;
        input.addEventListener("keypress", function (e) {
            if (!e.key.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻЬьЮюЯяЇїІіЄєҐґЁёЭэЪъ\s]/)) {
                e.preventDefault();
            }
        });
        input.addEventListener("input", () => {
            if (input.value.length >= 2) {
                this.valid(input);
                this.formData[input.name] = input.value.trim();
                isValid = true;
            } else {
                this.invalid(input);
                this.formData[input.name] = ''
                isValid = false;
            }
            if (!isValid) {
                input.nextElementSibling.innerHTML = `${name}`;
            } else {
                input.nextElementSibling.innerText = "";
            }
        });
    }

    addLotRate(btn) {
        try {
            // const response = await fetch(url, {
            //     method: "POST",
            //     body: JSON.stringify(data),
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // });
            btn.dataset.form = 'success';
            modalsEvents(btn);
            new Modal(".modal__form-answer").openModal();
            this.resetForm(btn);
            // if (this.form.dataset.formQuestion) {
            //     btn.dataset.form = 'success';
            //     modalsEvents(btn);
            //     new Modal(".modal__form-answer").openModal();
            //     this.resetForm(btn);
            // } else {
            //
            //     location.href = `${location.origin}/thank-you`
            //
            //
            // }


        } catch (error) {
            btn.dataset.form = 'erorr';
            modalsEvents(btn);
            new Modal(".modal__form-answer").openModal();
            this.resetForm(btn);

            console.error("Ошибка:", error);
        }

    }

    init() {
        this.formItemsEvents();
        if (this.date) {
            this.form.querySelectorAll('[data-form-date]').forEach(element => {
                console.log(element)
            })
            const calendarOptions =
                {
                    altInput: true,
                    altFormat: "d/m/Y",
                    dateFormat: "Y-m-d",
                    disableMobile: true,
                    monthSelectorType: 'static',
                    yearSelectorType: 'scroll',
                    minDate: "today",
                    static: true,
                    locale: "uk",
                    // locale: "pl",



                    // locale: {
                    //     locale: 'uk',
                    //     firstDayOfWeek: 1 // 1 represents Monday
                    // },
                    //
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
                }
            if (this.date.dataset.inline && this.date.dataset.inline == 'true') {
                calendarOptions.minDate = false;
                calendarOptions.inline = true;
                calendarOptions.defaultDate = 'today';
            }
            flatpickr(this.form.querySelector('[data-form-date]'), calendarOptions
            );
            if (this.date.closest('.form__item').querySelector('[data-calendar-btn]')) {

                this.date.closest('.form__item').querySelector('[data-calendar-btn]').addEventListener('click', () => {
                    this.date.nextElementSibling.click();
                    // console.log(this.date)form-control
                })
            }
        }

        this.checkInputs();
        this.form.addEventListener("submit", (e) => {
            this.formData.title = this.form.dataset.form;
            e.preventDefault();
            console.log(this.validateEmptyField())
            if (this.validateEmptyField()) {
                e.submitter.classList.add("disabled");
                e.submitter.innerHTML = `<svg class="icon btn__spinner">
        <use xlink:href="#spinner"></use>
      </svg>`;
                // if (!e.submitter.dataset.test) {
                //     this.sendToSheet(this.formData);
                // }
                if (this.form.dataset.form == 'rate') {
                    this.addLotRate(e.submitter);

                }
                // this.postData(this.path, this.formData, e.submitter);
            }
        });
    }
}

export default Form;

