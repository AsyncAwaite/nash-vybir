// import { modal } from "./elements";
// const modalForm = document.querySelector(".modal-form");
class Modal {
    constructor(selector) {
        this.modal = document.querySelector(selector);
        this.modalBody = this.modal.querySelector(".modal__body");
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
        this.modal.addEventListener("click", (e) => {
            this.handleOutside(e);
        });
    }

    closeModal() {
        setTimeout(() => {
            this.modal.classList = "modal";
            this.modal.classList.add("hide");
            this.modal.classList.remove("show");
            document.body.classList.remove("active");
            this.modalBody.classList = 'modal__body'
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
                });  });
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
        const isClickOutside = !!event.target.closest(".modal__wrapper");
        if (!isClickOutside) {
            this.closeModal(this.modal);
        }
    }
}

export default Modal;