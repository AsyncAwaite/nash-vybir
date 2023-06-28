import Swiper, {Navigation, Pagination, Autoplay} from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay]);
import {getElement} from "./helpers.js";

export default function slider() {
    if (getElement('[data-swiper="recommended-events"]')) {
        const recommendedEventsSlider = new Swiper('[data-swiper="recommended-events"]', {
            loop: true,

            navigation: {
                nextEl: '.button-next',
                prevEl: '.button-prev',
            },

            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.2,
                },
                768: {
                    slidesPerView: 3,
                },
                993: {
                    slidesPerView: 4,
                }
            },
            // simulateTouch: false,

        });
    }
    if (getElement('[data-swiper="promo-main-swiper"]')) {
        const promoMainSlider = new Swiper('[data-swiper="promo-main-swiper"]', {
            loop: true,
            slidesPerView: 1,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            // simulateTouch: false,

        });
    }
    if (getElement('[data-swiper="promo-adviser-swiper"]')) {
        const promoAdviserSlider = new Swiper('[data-swiper="promo-adviser-swiper"]', {
            loop: true,
            slidesPerView: 1,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            // simulateTouch: false,

        });
    }
    if (getElement('[data-swiper="promo-interview-swiper"]')) {
        const promoInterviewSlider = new Swiper('[data-swiper="promo-interview-swiper"]', {
            loop: true,
            slidesPerView: 1,
            // autoplay: {
                // delay: 5000,
                // disableOnInteraction: false,
            // },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            breakpoints: {

                768: {
                    slidesPerView: 2,
                },
                993: {
                    slidesPerView: 3,
                }
            },

        });
    }
}

