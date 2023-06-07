import Swiper,  { Navigation, Pagination } from 'swiper';
import {getElement} from "./helpers.js";
export default function slider (){
    if (getElement('[data-swiper="recommended-events"]')){
        const recommendedEventsSlider = new Swiper('[data-swiper="recommended-events"]', {
            loop: true,

            navigation:{
                nextEl: '.button-next',
                prevEl: '.button-prev',
            },

            autoplay: {
                delay: 5000,
            },
            breakpoints:{
                320:{
                    slidesPerView: 1.2,
                },
                768:{
                    slidesPerView: 3,
                },
                993:{
                    slidesPerView: 4,
                }
            },
            // simulateTouch: false,

        });
    }
}

