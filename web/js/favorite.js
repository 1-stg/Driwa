let favoriteCars = [];
document.body.insertAdjacentHTML(`afterbegin`, `<div class="favorite__background d-none">
      <div class="favorite__modal">
        <div class="favorite__header px-3">
          <h2>Избранные:</h2>
          <button id="exitButton" type="button">
            <img src="web/images/svg/x.svg" alt="Выход">
          </button>
        </div>
        <div class="favorite__body">
          <div class="container">
            <div class="row pb-3 pt-3 row-cols-sm-1 row-cols-md-2 row-cols-xxl-3 g-2">

            </div>
          </div>
        </div>
      </div>
    </div>`);

let favoriteButton = document.querySelector(`#favorite-button`);
let modalBackgroundNode = document.querySelector(`.favorite__background`);
let favoritModalNode = document.querySelector(`.favorite__modal`);
exitButton = document.querySelector(`#exitButton`);


function openFavorite() {
  modalBackgroundNode.classList.toggle(`d-none`);
  setTimeout(() => {
    favoritModalNode.classList.toggle(`is-visible`);
  }, 0);
}

function closeFavorite() {
  setTimeout(() => {
    favoritModalNode.classList.remove(`is-visible`);
  }, 0);
  setTimeout(() => {
    modalBackgroundNode.classList.toggle(`d-none`);
  }, 300)
}

favoriteButton.addEventListener(`click`, openFavorite);
exitButton.addEventListener(`click`, closeFavorite);


