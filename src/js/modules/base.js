const translateFields = {
    field: {
        en: "This field is required",
        ua: "Поле обов'язкове для заповнення",
        ru:"Поле обязательное для заполнения",
    },
    template: {
        en: "Fill in according to the template",
        ua: "Заповніть відповідно до шаблону",
        ru:"Заполните согласно шаблона",
    },
    send: {
        en: "Submit",
        ua: "Надіслати",
        ru:"Отправить",
    },
    validateName:{
        en: "Input your name",
        ua: `Введіть ваше ім’я`,
        ru: "Введите ваше имя",
    },
    name: {
        en: "Your name",
        ua: `Ваше ім’я`,
        ru:"Ваше имя",
    },
    email: {
        en: " Fill in according to the template - test@gmail.com",
        ua: `Ваше ім’я`,
        ru:"Ваше имя",
    },
    phone: {
        en: "Tel",
        ua: `Номер`,
        ru:"Номер",
    },
    formTitle: {
        en: "Fill out the form",
        ua: `Заповніть форму`,
        ru:"Заполните форму",
    },
    formSubtitle: {
        en: "And I will contact you shortly to discuss the details.",
        ua: `І я зв’яжусь з вами найближчим часом для обговорення деталей.`,
        ru:"И я свяжусь с вами в ближайшее время, чтобы обговорить детали.",
    },
    formPolicy: {
        en: `I respect confidentiality, so we must sign a <a href="/contract"  target="_blank"  class="text-color__accent f-weight--700">contract</a> before starting therapy`,
        ua: `Я поважаю конфіденційність, тому перед початком терапії ми повинні заключити <a href="/contract"  target="_blank"  class="text-color__accent f-weight--700">контракт</a>`,
        ru:`Я уважаю конфиденциальность, поэтому перед началом терапии мы должны заключить <a href=\"/contract\"  target=\"_blank\"  class=\"text-color__accent f-weight--700\">контракт</a>`,
    },
    message: {
        en: "Message",
        ua: `Повідомлення`,
        ru:"Сообщение",
    },
    formSuccessTitle: {
        en: "Thank you!",
        ua: 'Дякуємо!',
        ru:"Спасибо!",
    },
    formSuccessText: {
        en: "We will contact you soon",
        ua: 'Зв\'яжемося з вами найближчим часом',
        ru:"Свяжемся с вами в ближайшее время",
    },
    formErrorTitle: {
        en: "Oops...",
        ua: 'Упс...',
        ru:"Упс...",
    },
    formErrorText: {
        en: "An error occurred! Try it later!",
        ua: 'Виникла помилка! Спробуйте пізніше!',
        ru:"Возникла ошибка! Попробуйте позже!",
    },

    thankTitle: {
        en: "Дякуємо, ми зв'яжемося з Вами найближчим часом!",
        ua: "Дякуємо, ми зв'яжемося з Вами найближчим часом!",
    },
};
let lang = 'ua';
if (document.documentElement.lang.includes('en')) {
    lang = 'en';
}
if (document.documentElement.lang.includes('ru')) {
    lang = 'ru';
}
let certificates = null;
export {translateFields,lang, certificates}