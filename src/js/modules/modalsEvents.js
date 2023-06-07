// import { modalBody, modal } from "./elements";


import {header, modal, modalBody} from "./elements.js";
import {getElement, getElements, removeActive} from "./helpers.js";
import Form from "./Form.js";
import flatpickr from "flatpickr";


export default function modalsEvents(target) {
    if (target.dataset.target == 'add-event') {

        renderAddEventModal();
        if (getElement('.form-add-event')) {
            new Form('.form-add-event').init();

        }

    }
    if (target.dataset.target == 'add-ads') {

        renderAddAds();
        if (getElement('.form-add-ads')) {
            new Form('.form-add-ads').init();

        }

    }

    if (target.hasAttribute('data-rate')) {
        renderFormAnswer(target)
        // renderReviewModal(target);
    }
    const closeBtn = ` <button type="button" class="modal__close pos-a">
              <span class="icon-close icon-24"></span>
            </button>`
    modalBody.firstElementChild.insertAdjacentHTML('beforeend', closeBtn)
}
function renderAddEventModal(){
    modalBody.innerHTML =` <div class="event-add modal__content" data-inside>
                <h2 class="txt-uppercase txt-center">Додати подію</h2>
                <form action="" class="form form-add-event" data-form="Add new event">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form__item">
                                <label for="name" class="f-size__16 ">Назва події <span>*</span></label>
                                <div class="form__input pos-r">
                                    <input type="text" id="name" name="name">
                                    <span class="icon-24 pos-a icon-check  txt-color__success f-weight_800 "></span>
                                </div>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item  form__item_date date-item">
                                <label for="date">Дата і час <span>*</span></label>
                                <div class="form__input pos-r flex">
                                    <div class="date-item__icon flex-inline --just-center --align-center">
                                        <span class="icon-calendar "></span>
                                    </div>
                                    <input type="text" id="date" name="date" data-form-date="uk" placeholder="11/11/2011">
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>
                                </div>
                            </div>
                            <div class="form__item  ">
                                <label for="location" class="f-size__16 ">Локація <span>*</span></label>
                                <div class="form__input pos-r">
                                    <input type="text" id="location" name="location">
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>
                                </div>
                                <div class="form__message">Вкажіть адресу, яку розпізнає Google</div>
                            </div>
                            <div class="form__item  ">
                                <label for="link" class="f-size__16 ">Посилання на організатора / подію
                                    <span>*</span></label>
                                <div class="form__input pos-r">
                                    <input type="text" id="link" name="link">
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>
                                </div>
                            </div>
                            <div class="form__item">
                                <label class="f-size__16 "> Ціна
                                    <span>*</span></label>
                                <ul class="form__price">
                                    <li data-price="free">Безкоштовно</li>
                                    <li data-price="volunteer" class="active">Добровільний внесок</li>
                                    <li data-price="less10">до 10 злотих</li>
                                    <li data-price="more10">від 10 злотих</li>

                                </ul>
                            </div>
                            <div class="form__item form__item_textarea ">
                                <label for="description">Короткий опис <span>*</span></label>
                                <div class="form__input form__input_textarea pos-r">
                                    <textarea id="description"></textarea>
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>

                                </div>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__upload form__item ">
                                <div class="form__upload-input d-flex" data-upload="">
                                    <input type="file" id="file" accept=".png,.jpg,.jpeg" multiple="true">
                                    <div class="descr">Прикріпити обкладинку (до 3МБ) <span class="icon-add"></span></div>
                                </div>
                                <div class="form__upload-container flex --just-between --align-center" data-container="">
                                  <span>ssfssfsfsdfsdf.img</span>
                                    <span class="icon-close"></span>
                                </div>
                                <div class="error pos-a form__message">
<!--                                    Макс. розмір файлу не більше 10 мб.-->
                                </div>
                            </div>


                        </div>
                        <div class="col-md-6">
                            <div class="form__item">
                                <label for="name-pl" class="f-size__16 ">Nazwa wydarzenia <span>*</span></label>
                                <div class="form__input pos-r">
                                    <input type="text" id="name-pl" name="name-pl">
                                    <span class="icon-24 pos-a icon-check  txt-color__success f-weight_800 "></span>
                                </div>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item  form__item_date date-item">
                                <label for="date-pl">Data i godzina <span>*</span></label>
                                <div class="form__input pos-r flex">
                                    <div class="date-item__icon flex-inline --just-center --align-center">
                                        <span class="icon-calendar "></span>
                                    </div>
                                    <input type="text" id="date-pl" name="date-pl" data-form-date="pl" placeholder="11/11/2011">
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>
                                </div>
                            </div>
                            <div class="form__item  ">
                                <label for="location-pl" class="f-size__16 ">Lokalizacja <span>*</span></label>
                                <div class="form__input pos-r">
                                    <input type="text" id="location-pl" name="location-pl">
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>
                                </div>
                                <div class="form__message">Вкажіть адресу, яку розпізнає Google</div>
                            </div>
                            <div class="form__item  ">
                                <label for="link-pl" class="f-size__16 ">Link do organizatora / wydarzenia
                                    <span>*</span></label>
                                <div class="form__input pos-r">
                                    <input type="text" id="link-pl" name="link">
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>
                                </div>
                            </div>
                            <div class="form__item">
                                <label class="f-size__16 "> Cena
                                    <span>*</span></label>
                                <ul class="form__price">
                                    <li data-price="free">Bezpłatne</li>
                                    <li data-price="volunteer" class="active">Darowizna</li>
                                    <li data-price="less10">do 10 zł</li>
                                    <li data-price="more10">od 10 zł</li>
                                </ul>
                            </div>
                            <div class="form__item form__item_textarea ">
                                <label for="description-pl">Krótki opis wydarzenia <span>*</span></label>
                                <div class="form__input form__input_textarea pos-r">
                                    <textarea id="description-pl"></textarea>
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>

                                </div>
                                <div class="form__message"></div>
                            </div>



                        </div>


                    </div>
                    <div class="row --align-end">
                        <div class="col-lg-6">
                            <div class="form__item form__item_tags mb_0 ">
                                <label>Обрати теги <span>*</span></label>
                                <div class="flex --wrap">
                                    <button class="tag mr_12 active">Для підлітків</button>
                                    <button class="tag mr_12">Зустрічі</button>
                                    <button class="tag mr_12">Для дітей</button>
                                    <button class="tag mr_12">Для всієї родини</button>
                                    <button class="tag mr_12">Майстер-класи</button>
                                </div>

                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form__item mb_0 mx">
                                <button type="submit" class="btn mb_16">додати подію</button>
                            </div>

                        </div>
                    </div>
                </form>


            </div>`
}
function renderAddAds(){
    modalBody.innerHTML = `    <div class="bgc_white modal__content" data-inside>
                <h2 class="txt-uppercase txt-center">Додати оголошення</h2>
                <form action="" class="form form-add-ads" data-form="Add new event">
                    <div class="row mb_40">
                        <div class="col-md-6">
                            <div class="form__item">
                                <label for="name" class="f-size__16 ">Імʼя <span>*</span></label>
                                <div class="form__input pos-r">
                                    <input type="text" id="name" name="name">
                                    <span class="icon-24 pos-a icon-check  txt-color__success f-weight_800 "></span>
                                </div>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item  form__item_date date-item">
                                <label for="email">Email <span>*</span></label>
                                <div class="form__input pos-r flex">
                                    <input type="email" id="email" name="email" placeholder="email@gmail.com">
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>
                                </div>
                            </div>
                            <div class="form__item  ">
                                <label for="phone" class="f-size__16 ">Номер телефону <span>*</span></label>
                                <div class="form__input pos-r">
                                    <input type="text" id="phone" name="phone">
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>
                                </div>
                                <div class="form__message">Вкажіть адресу, яку розпізнає Google</div>
                            </div>
                            <div class="form__item form__item_dropdown">
                                <label class="f-size__16 ">Місто
                                    <span>*</span></label>
                                <div class="dropdown">
                                    <div class="dropdown__btn flex --just-between --align-center">
                                        <div class="dropdown__active" data-active="" data-dropdown-default="+0 km">
                                            Варшава
                                        </div>
                                        <span class="icon-down icon-24"></span>
                                    </div>
                                    <div class="dropdown__content">
                                        <ul class="dropdown__list">
                                            <li class="dropdown__item active">Варшава</li>
                                            <li class="dropdown__item">Вроцлав</li>

                                        </ul>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="col-md-6">
                            <div class="form__item">
                                <label for="title" class="f-size__16 "> Заголовок
                                    <span>*</span></label>
                                <div class="form__input pos-r">
                                    <input type="text" id="title" name="title">
                                    <span class="icon-24 pos-a icon-check  txt-color__success f-weight_800 "></span>
                                </div>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item ">
                                <label for="description">Оголошення <span>*</span></label>
                                <div class="form__input form__input_textarea pos-r">
                                    <textarea id="description"></textarea>
                                    <span class="icon-24 pos-a icon-check hide txt-color__success f-weight_800 "></span>

                                </div>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item form__item_tags  ">
                                <label>Обрати теги <span>*</span></label>
                                <div class="flex --wrap">
                                    <button class="tag mr_12 active">Пропоную роботу</button>
                                    <button class="tag mr_12">Шукаю роботу</button>
                                    <button class="tag mr_12">Шукаю житло</button>
                                    <button class="tag mr_12">Житло в оренду</button>
                                    <button class="tag mr_12">Послуги</button>
                                </div>

                            </div>
                            <div class="form__item flex --align-center form__checkbox">
                                <div class="checkbox flex-inline --align-center --just-center">
                                    <input type="checkbox" name="policy" id="footer-policy"
                                           value="Оголошення не порушує правила" checked="checked">
                                    <span class="icon-24 icon-check"></span>
                                </div>


                                <label for="footer-policy">


                                    Оголошення не порушує <a href="/privacy-policy" class="f-weight_700"
                                                             target="_blank">правила
                                </a>
                                </label>


                            </div>


                        </div>
                    </div>
                    <div class="row --align-end">

                        <div class="form__item mb_0 mx">
                            <button type="submit" class="btn">додати подію</button>
                        </div>


                    </div>
                </form>


            </div>`
}

function renderLotRateModal() {
    let {id, name, finish_date, min_step, start_price, current_price} = singleLot;
    const step = start_price / 100 * min_step
    modal.classList.add('modal__single-lot-rate');
    modalBody.classList.add('single-lot-rate');
    modalBody.innerHTML = `
    <div class="single-lot-rate__body">
        <div class="modal__title">
             <h3 class="f-weight--500">ЛОТ ${id}</h3>
        </div>
        <h5 class="modal__subtitle">
        "${name}"
</h5>
          <div class="info">
                                    <div class="info__line">
                                        <div class="text-size__16 f-weight--400">Стартова ціна</div>
                                        <div class="text-size__18">
                                            ${start_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} грн
                                        </div>
                                    </div>
                                    <div class="info__line">
                                        <div class="text-size__16 f-weight--400">Мінімальний крок</div>
                                        <div class="text-size__18">
                                            ${min_step}% (${step} грн)
                                        </div>
                                    </div>
                                       <div class="info__line">
                                        <div class="text-size__16 f-weight--400">Поточна ціна</div>
                                        <div class="text-size__18">
                                            ${current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} грн
                                        </div>
                                    </div>
                                    <div class="info__line">
                                        <div class="text-size__16 f-weight--400">Дата проведення</div>
                                        <div class="text-size__18">
                                            ${finish_date}
                                        </div>
                                    </div>
          </div>
        <form class="form form__rate form__login" data-form="rate">

                    <div class="form__items">
                        <div class="form__item valid">
                            <input type="number" id="rate" name="rate" value="${+current_price + +step}">
                            <label for="rate">Ваша ставка</label>
                            <div class="form__message"></div>
                        </div>
                        <button class="btn btn-fill" data-rate="rate-action"><span class="btn__text">зробити ставку</span></button>
                    </div>
                </form>
    </div>
    `
    new Form('[data-form="rate"]').init();
}

function renderLoginModal(target) {
    modal.classList.add('modal__login');
    modalBody.classList.add('login')
    modalBody.innerHTML = `
            <div class="login__body " data-user-form="registration">
            <div class="modal__title flex --just-between --align-center">
                  <h3 class="f-weight--500">Реестрація </h3>
                  <button class="btn btn-outline btn-sm" data-user-target="signin">вхід</button>
            </div>
            <div class="modal__subtitle h5 f-weight--500">
            Щоб зробити ставку будь-ласка зарееструйтеся або увійдіть у свій кабінет на сайті
            </div>
            <form class="form form__login" data-form="registration">

                    <div class="form__items">
                        <div class="form__item">
                            <input type="text" id="name-registration" name="name">
                            <label for="name">Імʼя</label>
                            <div class="form__message"></div>
                        </div>
                          <div class="form__item ">
                            <input type="password" id="password-registration" name="password">
                            <label for="password-registration">Пароль</label>
                            <div class="form__message"></div>
                        </div>
                        <div class="form__item">
                            <input type="text" id="email-registration" name="email">
                            <label for="email-registration">Email</label>
                            <div class="form__message"></div>
                        </div>
                           <div class="form__item ">
                            <input type="password" id="password-check-registration" name="password-check">
                            <label for="password-check-registration">Пароль повторно</label>
                            <div class="form__message"></div>
                        </div>
                        <div class="form__item valid">
                            <input type="text" id="tel-registration" name="tel">
                            <label for="tel-registration">Номер </label>
                            <div class="form__message"></div>
                        </div>
                        <button class="btn btn-fill"><span class="btn__text">ЗАРЕЄСТРУВАТИСЯ</span></button>
                    </div>
                </form>
            </div>
 <div class="login__body" data-user-form="signin">
            <div class="modal__title flex --just-between --align-center">
                  <h3 class="f-weight--500">ВХІД </h3>
                  <button class="btn btn-outline btn-sm" data-user-target="registration">реестрація</button>
            </div>
            <div class="modal__subtitle h5 f-weight--500">
            Щоб зробити ставку будь-ласка зарееструйтеся або увійдіть у свій кабінет на сайті
            </div>
            <form class="form form__login" data-form="signin">

                    <div class="form__items">
                    
                     
                        <div class="form__item">
                            <input type="text" id="email-signin" name="email">
                            <label for="email-signin">Email</label>
                            <div class="form__message"></div>
                        </div>
                             <div class="form__item ">
                            <input type="password" id="password-signin" name="password">
                            <label for="password-signin">Пароль</label>
                            <div class="form__message"></div>
                        </div>
                   
                        <button class="btn btn-fill"><span class="btn__text">УВІЙТИ</span></button>
                    </div>
                </form>
            </div>`
    new Form('[data-form="signin"]').init()
    new Form('[data-form="registration"]').init();
    getElements('[data-user-form]').forEach(userForm => {
        if (target.dataset.enter && userForm.dataset.userForm == 'registration') {
            userForm.classList.add('none')
            modalBody.classList.add('signin');
        }
        if (!target.dataset.enter && userForm.dataset.userForm == 'signin') {
            userForm.classList.add('none');

        }

    })
    getElements('[data-user-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            removeActive(getElements('[data-user-form]'), 'none')
            getElements('[data-user-form]').forEach(userForm => {
                if (userForm.dataset.userForm !== btn.dataset.userTarget) userForm.classList.add('none')
            })
            btn.dataset.userTarget == 'signin' ? modalBody.classList.add('signin') : modalBody.classList.remove('signin')
        })
    })
}


function renderFormAnswer(target) {
    modal.classList = 'modal modal__form-answer';
    modalBody.classList.add('form-answer');
    let title, subtitle;
    if (target.dataset.form == 'success') {
        title = !isPL ? 'Дякуємо!' : 'thank you!';
        subtitle = !isPL ? 'Ваша подія відправлена на модерацію!' : '';
        modalBody.parentElement.classList.add('success');
    } else {
        title = !isPL ? 'От халепа!' : '...';
        subtitle = !isPL ? "Щось пішло не так, ваша подія не додана" : '';
        modalBody.classList.add('flex', '--align-center', '--just-center', '--dir-col');
        modalBody.insertAdjacentHTML("afterbegin", `<div class="logo">
              <svg class="icon">
                <use xlink:href="#logo-uart"></use>
              </svg>
            </div>`)
    }
    modalBody.innerHTML = `

         
            <div class="modal__title">
                   <h3 class="text-uppercase">${title}</h3>
            </div>
<div class="modal__subtitle h5">
 ${subtitle}
</div>
     
           

            `
}
