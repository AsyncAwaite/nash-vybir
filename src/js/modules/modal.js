// import { modal } from "./elements";
// const modalForm = document.querySelector(".modal-form");
class Modal {
    constructor(selector) {
        this.modal = document.querySelector(selector);
        this.modalBody = this.modal.querySelector(".modal__body");
        this.scrollPosition = scrollY || document.documentElement.scrollTop;
    }

    openModal() {
        this.modal.classList.add("show");
        this.modal.classList.remove("hide");
        document.body.classList.add("active");
        this.attachModalEvents(this.modal);
    }

    attachModalEvents() {
        if (this.modal.querySelector(".modal__close")) {
            this.modal
                .querySelectorAll(".modal__close").forEach(closeBtn => {
                closeBtn.addEventListener("click", () => {
                    this.closeModal(this.modal);
                });
            })

        }

        document.addEventListener("keydown", (e) => {
            this.handleEscape(e);
        });
        this.disableScrollAndSwipes();
        this.modal.addEventListener("click", (e) => {
            this.handleOutside(e);
        });
    }

    closeModal() {
        this.enableScrollAndSwipes()


        setTimeout(() => {
            this.modal.classList = "modal";
            this.modal.classList.add("hide");
            this.modal.classList.remove("show");
            document.body.classList.remove("active");
        }, 0);

        this.detachModalEvents(this.modal);

        setTimeout(() => {
            this.modalBody.innerHTML = ``;
        }, 250);
    }

    detachModalEvents() {

        if (this.modal.querySelector(".modal__close")) {
            this.modal
                .querySelectorAll(".modal__close").forEach(closeBtn => {
                closeBtn.removeEventListener("click", () => {
                    this.closeModal(this.modal);
                });
            });
        }
        document.removeEventListener("keydown", (e) => {
            this.handleEscape(e);
        });

        this.modal.removeEventListener("click", (e) => {
            this.handleOutside(e);
        });
    }

    handleEscape(event) {
        if (event.key === "Escape") {
            this.closeModal(this.modal);
        }
    }

    handleOutside(event) {
        const isClickOutside = !!event.target.closest("[data-inside]");
        if (!isClickOutside) {
            this.closeModal(this.modal);
        }
    }

    disableScrollAndSwipes() {
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollPosition}px`;
    }

    enableScrollAndSwipes() {
        document.body.style.position = 'relative';
        document.body.style.top = '0';
        window.scrollTo(0, this.scrollPosition);

    }


}


export default Modal;