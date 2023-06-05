// import { modalBody, modal } from "./elements";


import {header, modal, modalBody} from "./elements.js";
import {getElement, getElements, removeActive} from "./helpers.js";
import Form from "./Form.js";
import {toggleMenu} from "./burger.js";

export default function modalsEvents(target) {
    if (target.dataset.target == 'login') {
        renderLoginModal(target);
        if (screen.width <= 1024) {
            toggleMenu()
        }

    }
    if (target.dataset.target == 'rate') {
        renderLotRateModal()
    }
    // if (target.dataset.target == 'rate-action') {}
    if (target.hasAttribute('data-rate')) {
        renderFormAnswer(target)
        // renderReviewModal(target);
    }
    const closeBtn = ` <button type="button" class="modal__close pos-a">
                <svg class="icon">
                    <use xlink:href="#close"></use>
                </svg>
            </button>`
    modalBody.insertAdjacentHTML('beforeend', closeBtn)
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
        title = !isEn ? 'ВАшУ СТАВКУ ПРИЙНЯТО!' : 'thank you!';
        subtitle = !isEn ? 'Дякуємо за ваш вклад!' : '';
        modalBody.parentElement.classList.add('success');
    } else {
        title = !isEn ? 'Упс...!' : '...';
        subtitle = !isEn ? "Виникла помилка! Спробуйте пізніше!" : '';
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
