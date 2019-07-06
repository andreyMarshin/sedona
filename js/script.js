let link = document.querySelector(".hotel-search-btn");
let popup = document.querySelector(".hotel-search-modal-block");

link.addEventListener("click", (evt) => {
    evt.preventDefault();
    popup.classList.add("modal-show");
});

/* open/close on click */

let isMenuShow = false;

link.addEventListener("click", () => {
    if (isMenuShow) {
    popup.classList.remove("modal-show");
        isMenuShow = false;
    } else {
        popup.classList.add("modal-show");
            isMenuShow = true;
    }
});


/* close on escp */

window.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        popup.classList.remove("modal-show");
    }
});

