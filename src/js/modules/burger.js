import {header} from "./elements.js";
const burger = () => {
    if (header) {
        const headerNav = header.querySelector(".header");
        const burger = header.querySelector(".burger");
        if (screen.availWidth <= 991){
            header.classList.add('--hide')
        }
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            header.classList.toggle("active");
            // header.classList.toggle('--show');
            // headerNav.classList.toggle("active");
            // document.body.classList.toggle("active");
        });
    }
};
export default burger;
