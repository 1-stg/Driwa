favoriteTemplate =
  ` <div class="modal-favorite-container-background">
    <div class="modal-favorite-container">
      <div class="modal-title-out">
        <h2>Избранные</h2>
        <div class="modal-x-container">
          <img class="modal-title-out-img" src="web/images/svg/x.svg" alt="Выход">
        </div>
      </div>
      <div class="modal-favorite-car-card-container">
      </div>
    </div>
  </div>`;



function closeModal() {
  const modalNode = document.querySelector(`.modal-favorite-container`);
  const backgroundModal = document.querySelector(`.modal-favorite-container-background`);

  if (modalNode) {
    modalNode.classList.remove(`is-visible`);
  }

  setTimeout(() => {
    if (backgroundModal) {
      backgroundModal.remove();
    }
    bodyNode.classList.remove(`body-modal`);
    favoriteButtonNode.addEventListener(`click`, favoriteClick);
  }, 300);
}

function favoriteClick() {
  favoriteButtonNode.removeEventListener(`click`, favoriteClick);

  bodyNode.insertAdjacentHTML(`beforeend`, favoriteTemplate);
  bodyNode.classList.add(`body-modal`);

  let outXNode = document.querySelector(`.modal-x-container`)
  let modalNode = document.querySelector(`.modal-favorite-container`)

  setTimeout(function () {
    modalNode.classList.add(`is-visible`)
  }, 0);

  let carCardConteinerNode = document.querySelector(`.modal-favorite-car-card-container`);
  let backgroundModal = document.querySelector(`.modal-favorite-container-background`);

  carCardConteinerNode.innerHTML = '';

  cars.forEach((car, index) => {
    carCardConteinerNode.insertAdjacentHTML(`beforeend`, `<div class="car-cart">
        <a href="car_details.html?car=${index + 1}">
          <div class="car-cart-img">
            <img src="${car[`images`][0]}" alt="${car[`title`]}" />
          </div>
          <div class="car-cart-text">
            <h2>${car[`title`]}</h2>
            <p class="car-cart-price">${car[`price`]} ₽</p>
            <p class="car-cart-mileage">${car[`mileage`]} Км</p>
          </div>
        </a>
      </div>`);
  });

  backgroundModal.addEventListener(`click`, function (event) {
    if (event.target === backgroundModal) {
      closeModal();
    }
  });

  outXNode.addEventListener(`click`, () => {
    closeModal();
  });

  document.addEventListener('keydown', function escapeHandler(event) {
    if (event.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}

let bodyNode = document.querySelector(`body`);
let favoriteButtonNode = document.querySelector(`#favorite-button`);



favoriteButtonNode.addEventListener(`click`, favoriteClick);