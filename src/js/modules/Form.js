import IMask from "imask";
import modalsEvents from "./modalsEvents.js";
import Modal from "./modal.js";
import {translateFields, lang} from "./base.js";
import {getElement, getElements, parseDateFromString} from "./helpers.js";
import flatpickr from "flatpickr";
import {filterGoogleMarkers, getAddressFromCoordinates, getLatLongFromUrl, searchParams} from "./googleMap.js";
import {changeActive} from "./functions.js";
import {
    filterByDate,
    filterByPrice,
    filterByTitle,
    filterMarkersByAndRadius,
    filterMarkersByCity
} from "./filterFunctions.js";
import {cityResult, dateResult, eventsContainer, map, renderFilteredEvents} from "../pages/mainPageEvents.js";


let validRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    mask: "+00 (000) 000 - 0000",
    lazy: false,
};


class Form {
    constructor(form) {
        this.form = getElement(form);
        this.inputs = this.form.querySelectorAll("input");
        this.path = `assets/services/telegramSend.php`;
        this.search = this.form.querySelector("[data-search]") ? this.form.querySelector("[data-search]") : null;
        this.date = this.form.querySelector('[data-form-date]') ? this.form.querySelector('[data-form-date]') : null;
        this.telInput = this.form.querySelector("[name='phone']") ? this.form.querySelector("[name='phone']") : null;
        this.mask = this.telInput ? new IMask(this.telInput, maskOptions) : null;
        this.textareas = this.form.querySelector('textarea') ? this.form.querySelectorAll('textarea') : null;
        this.upload = this.form.querySelector('[type="file"]')
            ? this.form.querySelector('[type="file"]')
            : false;
        this.formData = {
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

    uploadFiles() {
        if (this.upload) {
            const open = this.form.querySelector("[data-upload]");
            const container = this.form.querySelector("[data-container]");

            open.addEventListener("click", () => {
                this.upload.click();
            });

            this.upload.addEventListener("change", () => {
                const file = this.upload.files[0];
                open.parentElement.classList.remove('invalid');
                container.nextElementSibling.innerHTML = ''
                if (file && (file?.size / (1024 * 1024)).toFixed() > 3) {
                    open.parentElement.classList.add('invalid');
                    container.nextElementSibling.innerHTML = 'Файл повинен бути менше 3МБ'
                    return;
                }
                if (!this.upload.files.length || this.upload.files.length == 1) {
                    open.classList.add("hide");
                }

                container.innerHTML = ``;
                container.insertAdjacentHTML(
                    "afterbegin",
                    `<div class="form__upload-item flex --align-center --just-between w-100">
                    <div class="name "><span>${file.name}</span></div><div class="delete" data-name="${file.name}">&times;</div>
                        </div>`
                );

            });
            container.addEventListener("click", (event) => {
                if (!event.target.dataset.name) {
                    return;
                }
                const block = getElement('[data-name]', container).closest(".form__upload-item");
                block.classList.add("hide");
                open.classList.remove("hide");
                setTimeout(() => block.remove(), 300);
            });
        } else {
            return;
        }
    }

    formItemsEvents() {
        this.uploadFiles();
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
            if (input.type === "text" && input.name !== "phone") {
                this.checkTextInput(input);
            }

            if (input.name === "phone") {

                this.checkPhoneInput(input);
            }

            if (input.name === 'email') {

                this.checkEmailInput(input)
            }
            if (input.name == 'password') {
                this.checkPasswordInput(input)
            }
            if (input.name == 'passwordRepeat') {
                this.checkPasswordRepeat(input)
            }


        });
        this.textareas?.forEach(textarea => {
            this.checkTextInput(textarea);
        })

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
            if (input.name == 'phone') {
                this.mask.updateValue();
            }
        });
        this.checkInputs();
    }

    checkPasswordInput(input) {
        const {password} = translateFields;
        const value = password[lang];
        input.addEventListener("input", () => {
            if (input.value.length >= 6) {
                this.valid(input);
            } else {
                this.invalid(input);
                getElement('.form__message', input.closest('.form__item')).innerHTML = value;
            }
        });
    }

    checkPasswordRepeat(input) {
        const {passwordRepeat} = translateFields;
        const value = passwordRepeat[lang];
        input.addEventListener("input", () => {
            if (input.value && input.value == getElement("#password", this.form).value) {
                this.valid(input);
            } else {
                this.invalid(input);
                getElement('.form__message', input.closest('.form__item')).innerHTML = value;
            }
        });
    }

    checkTextInput(input) {
        const {name: nameInput} = translateFields;
        const name = nameInput[lang];
        let isValid = false;
        input.addEventListener("keypress", function (e) {
            const allowedCharacters = {
                pl: 'a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻъ\\s0-9\n',
                ua: 'a-zA-Zа-яА-ЯЬьЮюЯяЇїІіЄєҐґЁёЭэЪъ\\s0-9\n',
            };

            const language = input.name.includes('pl') ? 'pl' : 'ua';

            if (!e.key.match(new RegExp(`^[${allowedCharacters[language]}]`))) {
                e.preventDefault();
            }


        });

        input.addEventListener("input", () => {
            isValid = input.value.length >= 2;

            if (isValid) {
                this.valid(input);
                if (input.tagName !== 'TEXTAREA') {
                    this.formData[input.name] = input.value.trim();
                }

            } else {
                this.invalid(input);
                if (input.tagName !== 'TEXTAREA') {
                    this.formData[input.name] = '';
                }

            }
            if (getElement('.form__message', input.closest('.form__item'))) {
                getElement('.form__message', input.closest('.form__item')).innerHTML = isValid ? '' : name;

            }

        });

    }

    checkEmailInput(input) {
        let {email: emailInput} = translateFields;
        let email = emailInput[lang];
        let isValid = false;

        input.addEventListener("input", () => {
            if (input.value.match(validRegex)) {
                this.valid(input);
                this.formData.email = input.value;
                isValid = true;
            } else {
                this.invalid(input);
            }
            getElement('.form__message', input.closest('.form__item')).innerHTML = isValid ? "" : email;


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
            } else {
                this.invalid(input);

            }
            getElement('.form__message', input.closest('.form__item')).innerHTML = isValid ? "" : template;

        });
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
        let value = field[lang];

        let validator = {
            password: null,
            email: null
        };
        if (this.form.classList.contains('form-add-event')) {
            validator = {};
            validator = {
                name: null,
                "name-pl": null,
                date: null,
                "link-organisation": null,
                location: null,
                description: null,
                "description-pl": null,
            };
        }
        if (this.form.classList.contains('form-register')) {
            validator = {};
            validator = {
                email: null,
                password: null,
                passwordRepeat: null
            }
        }
        if (this.form.classList.contains('form-contact')) {
            validator = {};
            validator = {
                name: null,
                phone: null
            };
        }
        let validInputs = false;
        this.inputs.forEach((input) => {
            if (input.type === "text" && input.name !== "phone") {
                if (!input.value.trim()) {
                    input.closest('.form__item').classList.add("invalid");
                    if (getElement('.form__message', input.closest('.form__item'))) {
                        getElement('.form__message', input.closest('.form__item')).innerHTML = `${
                            value
                        }`;
                    }

                } else {
                    this.valid(input);
                    if (getElement('.form__message', input.closest('.form__item'))) {
                        getElement('.form__message', input.closest('.form__item')).innerHTML = ``;
                    }
                    validator[input.name] = true;
                }
            } else if (input.name === "phone") {
                if (input.value.indexOf("_") === -1) {
                    this.valid(input);
                    input.nextElementSibling.innerText = "";
                    validator[input.name] = true;
                } else {
                    input.closest('.form__item').classList.add("invalid");
                    getElement('.form__message', input.closest('.form__item')).innerHTML = `${
                        value
                    }`;
                }
            } else if (input.type === "email") {
                if (!input.value.match(validRegex)) {
                    input.closest('.form__item').classList.add("invalid");
                    getElement('.form__message', input.closest('.form__item')).innerHTML = `${
                        value
                    }`;
                } else {
                    this.valid(input);
                    input.nextElementSibling.innerText = "";
                    validator.email = true;
                }
            } else if (input.type === "password") {
                if (!input.value.trim()) {
                    input.closest('.form__item').classList.add("invalid");
                    getElement('.form__message', input.closest('.form__item')).innerHTML = `${
                        value
                    }`;
                } else {
                    this.valid(input);
                    getElement('.form__message', input.closest('.form__item')).innerText = "";
                    validator[input.name] = true;
                }
            }
        });
        this.textareas?.forEach(textarea => {
            if (!textarea.value.trim()) {
                textarea.closest('.form__item').classList.add("invalid");
                getElement('.form__message', textarea.closest('.form__item')).innerHTML = `${
                    value
                }`;
            } else {
                this.valid(textarea);
                textarea.nextElementSibling.innerText = "";
                validator[textarea.id] = true;
            }
        })
        if (this.date) {
            if (!this.date.value.trim()) {
                this.date.closest('.form__item').classList.add("invalid");
                this.date.closest('.form__input').nextElementSibling.innerHTML = `${
                    value[lang]
                }`;
            } else {
                this.valid(this.date);
                this.date.closest('.form__input').nextElementSibling.innerText = "";
                validator.date = true;
            }
        }
        if (this.form.classList.contains('form-add-event')) {
            if (!getElements('[data-form-tag].active', this.form).length) {
                validator.formTag = null;
                getElement('.form__item_tags', this.form).classList.add('invalid')
            } else {
                validator.formTag = true;
                if (getElement('.form__item_tags', this.form).classList.contains('invalid')) {
                    getElement('.form__item_tags', this.form).classList.remove('invalid')
                    getElement('.form__item_tags', this.form).classList.add('valid')
                }
            }

        }
        console.log(validator)
        for (let key in validator) {
            if (!validator[key]) return validInputs = false;
            validInputs = true;
        }
        if (validInputs) {
            return true;
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
                body: data,
            });
            const result = await response.json();
            if (result.success) {
                btn.classList.remove("disabled");
                btn.innerHTML = 'Збережено';
                setTimeout(() => {
                    btn.innerHTML = btn.dataset.text;
                }, 2000)
                //TODO Додати мову
            }
        } catch (error) {
            btn.dataset.form = 'erorr';
            modalsEvents(btn);
            new Modal(".modal__form-answer").openModal();
            this.resetForm(btn);

            console.error("Ошибка:", error);
        }
    }

    async postData1(url, data, btn) {
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

    createFormData(arr) {
        const data = new FormData();
        for (let key in arr) {
            data.append(`${key}`, `${arr[key]}`);
        }
        return data;
    }

    renderRequestAnswer(message) {
        this.form.insertAdjacentHTML('beforeend', `<div class="form__answer">${message}</div>`)
    }

    async userEvents(url, data, btn) {
        try {
            const response = await fetch(url, {
                method: "POST",
                body: data,
            });
            let result = await response.json();
            if (!result.success) {
                btn.classList.remove("disabled");
                btn.innerHTML = btn.dataset.text;
                this.renderRequestAnswer(result.message);
            } else {
                location.href = location.origin;

            }
        } catch (error) {
            btn.dataset.form = 'erorr';
            // modalsEvents(btn);
            // new Modal(".modal__form-answer").openModal();
            // this.resetForm(btn);
            console.error("Ошибка:", error);
        }
    }

    registration(btn) {
        let registrationValues;
        if (btn.dataset.form === 'registration') {
            registrationValues = {
                action: "register_user_front_end",
                username: getElement('#email', this.form).value,
                password: getElement('#password', this.form).value,
            }
        } else {
            registrationValues = {
                action: "custom_user_login",
                username: getElement('#email', this.form).value,
                password: getElement('#password', this.form).value,
            }
        }
        const data = this.createFormData(registrationValues);

        this.userEvents(ajax_url, data, btn);
    }

    async createEvent(btn) {
        this.formData.action = "create_event";
        const locationUrl = this.formData.location;
        const coordinate = getLatLongFromUrl(locationUrl);
        if (coordinate) {
            this.formData.longitude = coordinate.longitude;
            this.formData.latitude = coordinate.latitude;
            const resultUkraine = await getAddressFromCoordinates({
                language: 'uk', longitude: coordinate.longitude, latitude: coordinate.latitude
            });

            if (resultUkraine.country && resultUkraine.city) {
                this.formData['country-ua'] = resultUkraine.country;
                this.formData['city-ua'] = resultUkraine.city;
            }


            const resultPoland = await getAddressFromCoordinates({
                language: 'pl', longitude: coordinate.longitude, latitude: coordinate.latitude
            });


            if (resultPoland.country && resultPoland.city) {
                this.formData['country-pl'] = resultPoland.country;
                this.formData['city-pl'] = resultPoland.city;
            }

            this.formData['placeId'] = resultPoland.placeId


        }


        const data = this.createFormData(this.formData);
        data.append(`thumbnail`, this.upload.files[0]);
        try {
            const response = await fetch(ajax_url, {
                method: "POST",
                body: data,
            });
            let result = await response.json();
            if (!result.success) {
                btn.dataset.form = 'error';
                modalsEvents(btn);
            } else {
                btn.dataset.form = 'add';
                modalsEvents(btn);
            }

        } catch (error) {
            btn.dataset.form = 'error';
            modalsEvents(btn);


            console.error("Ошибка:", error);
        }
        console.log(this.formData)

    }

    async updateUser(btn) {
        let userData = {
            action: "custom_user_fields_update",
            name: getElement('#name', this.form).value,
            phone: getElement('#phone', this.form).value,
        }
        const data = this.createFormData(userData);
        await this.postData(ajax_url, data, btn)
    }

    searchEvents(map) {
        changeActive(getElements('ul .tag'), this.form)
        if (this.date) {
            let startDate = null;
            let endDate = null;
            const calendarOptions =
                {
                    altInput: true,
                    altFormat: "d/m/Y",
                    dateFormat: "Y-m-d",
                    disableMobile: true,
                    mode: 'range',
                    monthSelectorType: 'static',
                    yearSelectorType: 'scroll',
                    minDate: "today",
                    static: true,
                    locale: "uk",
                    // locale: "pl",
                    onValueUpdate: function (selectedDates, dateStr, instance) {
                        if (selectedDates.length === 1) {
                            startDate = selectedDates[0];
                        } else if (selectedDates.length === 2) {
                            endDate = selectedDates[1];
                        }
                        if (startDate && endDate) {
                            if (startDate.getDay() !== endDate.getDay()) {
                                let [start, end] = this.element.value.split(' to ')
                                this.element.value = `${start} - ${end}`
                            } else {
                                let [start] = this.element.value.split(' to ')
                                this.element.value = `${start}`
                            }


                        }

                    },
                    onChange: function (selectedDates, dateStr, instance) {
                        if (searchParams.date && searchParams.date == dateStr) {
                            this.element.value = '';
                            this.selectedDateElem.classList.remove('selected');
                            searchParams.date = null;
                            searchParams.dateLabel = null;
                            return
                        }
                        let valueDate = '';
                        if (selectedDates.length == 2) {
                            selectedDates.forEach(date => valueDate += `${formatDateToValue(date)} - `)
                        } else {
                            valueDate = formatDateToValue(selectedDates[0])
                        }


                        if (selectedDates.length == 2) {
                            valueDate = valueDate.slice(0, -3)
                        }
                        console.log(valueDate, selectedDates)


                        searchParams.date = valueDate;
                        searchParams.dateLabel = instance.selectedDateElem.ariaLabel;
                        const [startDateStr, endDateStr] = searchParams.date.split(" - ");


                        function formatDate(dateStr) {
                            const options = {year: 'numeric', month: 'long', day: 'numeric'};
                            return new Date(dateStr).toLocaleDateString('uk-UA', options);
                        }


                        const formattedStartDate = formatDate(startDateStr);
                        const formattedEndDate = endDateStr ? ' - ' + formatDate(endDateStr) : '';

                        searchParams.dateLabel = `${formattedStartDate}${formattedEndDate}`;


                    },
                }

            const calendar = flatpickr(this.form.querySelector('[data-form-date]'), calendarOptions);


            if (this.date.closest('.form__item').querySelector('[data-calendar-btn]')) {
                this.date.closest('.form__item').querySelector('[data-calendar-btn]').addEventListener('click', () => {
                    this.date.nextElementSibling.click();
                })
            }
        }
        this.form.addEventListener("submit", (e) => {
            this.formData = {}
            e.preventDefault();
            this.formData.date = searchParams.date;
            this.formData.price = getElement('.active[data-price]', this.form)?.dataset.price;
            this.formData.radius = +getElement('.dropdown__active', this.form)?.dataset.active;
            searchParams.radius = this.formData.radius;
            this.formData.city = searchParams.place;
            this.formData.searchTitle = getElement('[type="search"]', this.form)?.value
            let filteredEvents = eventsPortal;
            for (let key in this.formData) {
                if (this.formData[key]) {
                    switch (key) {
                        case 'searchTitle':
                            filteredEvents = [...filterByTitle(this.formData[key], filteredEvents)]
                            break;
                        case 'price':
                            filteredEvents = [...filterByPrice(this.formData[key], filteredEvents)]
                            break;
                        case 'date':
                            filteredEvents = [...filterByDate(this.formData[key], filteredEvents)]
                            break;
                        case 'city' :
                            if (this.formData.radius) {
                                filteredEvents = [...filterMarkersByAndRadius(this.formData[key], filteredEvents)]

                            } else {
                                filteredEvents = [...filterMarkersByCity(this.formData[key], filteredEvents)]


                            }
                            if (filteredEvents.length) {
                                const selectedCityCoords = {
                                    lat: this.formData[key].geometry.location.lat(),
                                    lng: this.formData[key].geometry.location.lng()
                                };
                                map.setCenter(selectedCityCoords);
                                map.setZoom(11)
                            }
                            break;
                        default :
                            break;
                    }

                }
            }
            dateResult.innerHTML = searchParams.dateLabel ?? dateResult.dataset.resultDatelabel;
            cityResult.innerHTML = (searchParams.place ? searchParams.place.vicinity : cityResult.dataset.resultCity) + ',';
            cityResult.classList = searchParams.place ? 'txt-underline' : ' ';
            filterGoogleMarkers(filteredEvents);
            eventsContainer.innerHTML = renderFilteredEvents(filteredEvents);

            window.scrollTo({
                top: getElement('.map').offsetTop,
                behavior: "smooth",
            });


        });
    }

    authHandler() {
        this.checkInputs();
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.validateEmptyField()) {
                e.submitter.classList.add("disabled");
                e.submitter.innerHTML = `<svg class="icon btn__spinner">
        <use xlink:href="#spinner"></use>
      </svg>`;

                const form = this;
                grecaptcha.ready(function () {
                    grecaptcha.execute('6LcTOY4nAAAAALKRZkgCgcuAmq19rfEVTINr26gr', {action: 'submit'}).then(async function (token) {
                        const data = form.createFormData({
                            action: 'check_recaptcha',
                            recaptcha_response: token
                        });
                        const response = await fetch(ajax_url, {
                            method: "POST",
                            body: data,
                        });
                        let result = await response.json();
                        if (result.success) {
                            form.registration(e.submitter);
                        } else {
                            e.submitter.dataset.form = 'erorr';
                            e.submitter.classList.remove("disabled");
                            e.submitter.innerHTML = e.submitter.dataset.text;
                            form.renderRequestAnswer('Упс... Щось пішло не так. Спробуйте пізніше');
                        }
                    });
                });
            }
        });
    }

    init() {

        this.formItemsEvents();
        if (this.date) {
            let startDate = null;
            let endDate = null;
            const calendarOptions =
                {
                    altInput: true,
                    altFormat: "d/m/Y",
                    dateFormat: "Y-m-d",
                    disableMobile: true,
                    mode: 'range',
                    monthSelectorType: 'static',
                    yearSelectorType: 'scroll',
                    minDate: "today",
                    static: true,
                    locale: "uk",
                    // locale: "pl",
                    onValueUpdate: function (selectedDates, dateStr, instance) {
                        if (selectedDates.length === 1) {
                            startDate = selectedDates[0];
                        } else if (selectedDates.length === 2) {
                            endDate = selectedDates[1];
                        }
                        if (startDate && endDate) {
                            let time = instance.hourElement.value + ':' + instance.minuteElement.value;


                            if (startDate.getDay() !== endDate.getDay()) {
                                instance.altInput.value = instance.altInput.value.split('to').join('-')
                                let [start, end] = this.element.value.split(' to ')
                                this.element.value = `${start} ${time} - ${end} ${time}`
                            } else {
                                instance.altInput.value = instance.altInput.value.split('to')[0]
                                let [start] = this.element.value.split(' to ')
                                this.element.value = `${start} ${time}`
                            }


                        }

                    },
                    onChange: function (selectedDates, dateStr, instance) {
                        // if (searchParams.date && searchParams.date == dateStr) {
                        //     this.element.value = '';
                        //     this.selectedDateElem.classList.remove('selected');
                        //     searchParams.date = null;
                        //     searchParams.dateLabel = null;
                        //     return
                        // }


                        if (!this.element.value) {

                        } else {
                            if (this.element.closest('.form__item').classList.contains('invalid')) {
                                this.element.closest('.form__item').classList.remove('invalid');
                                this.element.closest('.form__item').classList.add('valid');
                            }
                            this.element.closest('.form__input').nextElementSibling.innerHTML = '';
                        }


                    },
                    onClose: function (selectedDates, dateStr, instance) {
                        if (this.element.closest('.form-add-event')) {
                            if (selectedDates.length === 1) {
                                instance.setDate([selectedDates[0], selectedDates[0]]);
                                if (selectedDates[0].getDay() == selectedDates[0].getDay() && selectedDates[0].getMonth() == selectedDates[0].getMonth()) {
                                    instance.altInput.value = instance.altInput.value.split('to')[0]
                                }
                            } else {
                                instance.setDate([selectedDates[0], selectedDates[1]]);
                            }

                        }


                    },
                }
            if (this.date.dataset.inline && this.date.dataset.inline == 'true') {
                calendarOptions.minDate = false;
                calendarOptions.inline = true;
                calendarOptions.defaultDate = 'today';
            }
            if (this.form.classList.contains('form-add-event')) {
                calendarOptions.dateFormat = 'Y-m-d';
                calendarOptions.altFormat = "d/m/Y";
                calendarOptions.enableTime = true;
            }

            const calendar = flatpickr(this.form.querySelector('[data-form-date]'), calendarOptions);


            if (this.date.closest('.form__item').querySelector('[data-calendar-btn]')) {
                this.date.closest('.form__item').querySelector('[data-calendar-btn]').addEventListener('click', () => {
                    this.date.nextElementSibling.click();
                })
            }
        }
        this.checkInputs();

        this.form.addEventListener("submit", (e) => {

            e.preventDefault();

            if (this.form.classList.contains('form-add-event')) {
                this.formData.title = this.form.dataset.form;
                this.formData.date = this.date.value;
                this.formData.price = getElement('.form__price li.active', this.form).dataset.price;
                let tags = [];
                getElements('.form-tag.active', this.form).forEach(tag => {
                    tags = [...tags, tag.dataset.formTag];
                })

                this.textareas.forEach(textarea => {
                    this.formData[textarea.id] = textarea.value;
                })
                this.formData.tags = tags;
                console.log(this.formData)

            }
            if (this.validateEmptyField()) {
                e.submitter.classList.add("disabled");
                e.submitter.innerHTML = `<svg class="icon btn__spinner">
        <use xlink:href="#spinner"></use>
      </svg>`;
                if (this.form.classList.contains('form-add-event')) {

                    this.createEvent(e.submitter)
                    return;
                }
                if (this.form.classList.contains('form-contact')) {
                    this.updateUser(e.submitter)
                }
                console.log(this.form)

                // this.postData(this.path, this.formData, e.submitter);
            }
        });
        return this;
    }

    create() {
        return this;
    }

}

function formatDateToValue(date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // +1, так как месяцы в JavaScript начинаются с 0
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;

}

// custom_user_fields_update
export default Form;

