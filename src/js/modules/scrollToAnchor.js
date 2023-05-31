import { header } from "./elements.js";

  let loc = location.origin;
const scrollToAnchor = function () {
  if (header) {
    const links = document.querySelectorAll(".scroll-to");
    links.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        const blockID = link.getAttribute("href");
        const headerHeight = header.offsetHeight;
        if (
          document.querySelector(".burger") &&
          document.querySelector(".burger").classList.contains("active")
        ) {
          document.querySelector(".burger").classList.toggle("active");
          header.querySelector('.menu').classList.toggle("active");
          document.body.classList.toggle("active");
        }
        //
        // scrollToAnotherPage(blockID, "#about");
        //
        // scrollToAnotherPage(blockID, "#join");
        scrollToAnotherPage(blockID, "#programs");

        window.scrollTo({
          top: document.querySelector(`${blockID}`).offsetTop - headerHeight,
          behavior: "smooth",
        });
      });
    });
  }
};
function scrollToAnotherPage(el, target) {
  if (target) {
    if (el === target) {
      location.href = `${loc}${target}`;
    }
  } else{
    return;
  }
}
export { scrollToAnchor };
