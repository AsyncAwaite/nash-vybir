import Swiper from 'swiper/bundle';
const slaider = new Swiper('.swiper', {
    loop: true,
   
    navigation:{
        nextEl: '.button-next',
        prevEl: '.button-prev',
    },
    centeredSlides: true,

    breakpoints:{
        320:{
            slidesPerView: 1.5, 
        },
        991:{
            slidesPerView: 3, 
        },
        1441:{
            slidesPerView: 3, 
        }
    },
    simulateTouch: false,
   
});