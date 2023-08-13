const translateFields = {
    field: {
        pl: "This field is required",
        uk: "Поле обов'язкове для заповнення",
    },
    template: {
        pl: "Fill in according to the template",
        uk: "Заповніть відповідно до шаблону",
    },
    name: {
        pl: "",
        uk: "",
    },
    send: {
        pl: "Submit",
        uk: "Надіслати",
    },

    email: {
        pl: " Fill in according to the template - test@gmail.com",
        uk: `Заповніть згідно до шаблону - test@gmail.com`,
    },
    phone: {
        pl: "Tel",
        uk: `Номер`,
    },
    formTitle: {
        pl: "Fill out the form",
        uk: `Заповніть форму`,
    },
    formSubtitle: {
        pl: "And I will contact you shortly to discuss the details.",
        uk: `І я зв’яжусь з вами найближчим часом для обговорення деталей.`,
    },
    password: {
        pl: "Пароль має бути довший ніж 6 символів",
        uk: `Пароль має бути довший ніж 6 символів`,

    },
    passwordRepeat: {
        pl: "Паролі мають співпадати!",
        uk: `Паролі мають співпадати!`,

    },

    message: {
        pl: "Message",
        uk: `Повідомлення`,
    },
    formSuccessTitle: {
        pl: "Thank you!",
        uk: 'Дякуємо!',
    },
    formSuccessEventText: {},
    formSuccessText: {
        pl: "We will contact you soon",
        uk: 'Ваша подія відправлена на модерацію!',
    },
    formErrorTitle: {
        pl: "Oops...",
        uk: 'Упс...',
    },
    formErrorText: {
        pl: "An error occurred! Try it later!",
        uk: 'Виникла помилка! Спробуйте пізніше!',
    },

    thankTitle: {
        pl: "Дякуємо, ми зв'яжемося з Вами найближчим часом!",
        uk: "Дякуємо, ми зв'яжемося з Вами найближчим часом!",
    },
};
let lang = 'uk';
if (document.documentElement.lang.includes('pl')) {
    lang = 'pl';
}

const categories = [
    {
        uk: 'Освіта',
        pl: 'Edukacja',
        slug: 'education'
    },
    {
        uk: 'Музика',
        pl: 'Muzyka',
        slug: 'music'
    }, {
        uk: 'Кіно',
        pl: 'Kino',
        slug: 'cinema'
    }, {
        uk: 'Театр',
        pl: 'Teatr',
        slug: 'theater'
    }, {
        uk: 'Музеї',
        pl: 'Muzea',
        slug: 'museum'
    }, {
        uk: 'Майстер-класи',
        pl: 'Warsztaty',
        slug: 'master-classes'
    }, {
        uk: 'Екскурсії',
        pl: 'Wycieczki',
        slug: 'excursions'
    }, {
        uk: 'Для дітей',
        pl: 'Dla dzieci',
        slug: 'children'
    }, {
        uk: 'Для підлітків',
        pl: 'Dla nastolatków',
        slug: 'teenagers'
    }, {
        uk: 'Для всієї родини',
        pl: 'Dla całej rodziny',
        slug: 'family'
    }, {
        uk: 'Для жінок',
        pl: 'Dla kobiet',
        slug: 'women'
    }, {
        uk: 'Для сеньйорів',
        pl: 'Dla seniorów',
        slug: 'seniors'
    }, {
        uk: 'Консультації',
        pl: 'Konsultacji',
        slug: 'consultations'
    },{
        uk: 'Психологія',
        pl: 'Psychologia',
        slug: 'psychology'
    },{
        uk: 'Легалізація',
        pl: 'Legalizacja',
        slug: 'legalization'
    },{
        uk: 'Інтеграція',
        pl: 'Integracja',
        slug: 'integration'
    },{
        uk: 'Ігри',
        pl: 'Gry',
        slug: 'games'
    },{
        uk: 'Робота',
        pl: 'Praca',
        slug: 'work'
    },{
        uk: 'Лекції',
        pl: 'Wykłady',
        slug: 'lectures'
    },{
        uk: 'Спорт',
        pl: 'Sport',
        slug: 'sport'
    },{
        uk: 'Концерт',
        pl: 'Koncerty',
        slug: 'concert'
    },{
        uk: 'Вечірки',
        pl: 'Imprezy',
        slug: 'parties'
    },{
        uk: 'Зустрічі',
        pl: 'Spotkania',
        slug: 'meetings'
    },{
        uk: 'Інше',
        pl: 'Inne',
        slug: 'other'
    },

]

export {translateFields, lang, categories}