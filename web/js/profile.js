document.addEventListener(`DOMContentLoaded`, () => {
    renderCars([]);
})

let createLink = document.querySelector(`.ads__body`);
createLink.addEventListener(`click`, () => {
    location.href = `adCreate.html`;
})