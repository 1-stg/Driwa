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
          <div class="container cars-modal-container">
            <div class="row pb-3 pt-3 row-cols-1 row-cols-xxl-2 g-2 favorites-container">
            </div>
            <div id="empty-favorites" class="text-center d-none">
              <img src="web/images/svg/favorite.svg" alt="Нет избранных" class="mb-3" style="width: 100px; height: 100px;">
              <h3>Нет избранных автомобилей</h3>
            </div>
          </div>
        </div>
      </div>
    </div>`);

let favoriteButton = document.querySelector(`#favorite-button`);
let modalBackgroundNode = document.querySelector(`.favorite__background`);
let favoritModalNode = document.querySelector(`.favorite__modal`);
exitButton = document.querySelector(`#exitButton`);
let favoritesContainer = document.querySelector(`.favorites-container`);
let emptyFavorites = document.querySelector(`#empty-favorites`);

const cars = [
  {
    'id': 1,
    'images': ["web/images/png/audi_r8.png", "web/images/png/audi_r8_2.jpg", "web/images/png/audi_r8_3.jpg"],
    'title': "Audi R8",
    'price': "6.000.000",
    'mileage': "10.000",
    'year': "2016",
    'ownersCount': "2",
    'gearbox': "Роботизированная",
    'color': "Серый",
    'engine': '550 л.с., 5.2 л, Бензин',
    'driveShaft': 'Полный'
  },
  {
    'id': 2,
    'images': ["web/images/png/bmw_m4.png", "web/images/png/bmw_m4_2.jpg"],
    'title': "Bmw M4",
    'price': "4.000.000",
    'mileage': "50.000",
    'year': "2018",
    'ownersCount': 2,
    'gearbox': "роботизированная",
    'color': 'Белый',
    'engine': '3.0 л, 450 л.с., бензин',
    'driveShaft': 'задний',
  },
  {
    'id': 3,
    'images': ["web/images/png/toyota_rav4.png"],
    'title': "Toyota RAV4",
    'price': "10.000.000",
    'mileage': "30.000",
    'year': "2025",
    'ownersCount': "1",
    'gearbox': "вариатор",
    'color': "Металик",
    'engine': "2.0 л, 171 л.с., бензин",
    'driveShaft': "полный",
  },
  {
    'id': 4,
    'images': ["web/images/png/mclaren_720s.png"],
    'title': "McLaren 720S",
    'price': "20.000.000",
    'mileage': "1.000",
    'year': "2018",
    'ownersCount': "1",
    'gearbox': "роботизированная",
    'color': "Белый",
    'engine': "4.0 л, 720 л.с., бензин",
    'driveShaft': "задний",
  },
  {
    'id': 5,
    'images': ["web/images/png/porsche_panamera.png"],
    'title': "Porsche",
    'price': "10.000.000",
    'mileage': "45.000",
    'year': "2021",
    'ownersCount': "1",
    'gearbox': "роботизированная",
    'color': "черный",
    'engine': "2.9 л, 330 л.с., бензин",
    'driveShaft': "полный",
  },
  {
    'id': 6,
    'images': ["web/images/png/vaz_2107.png"],
    'title': "Lada (ВАЗ) 2107",
    'price': "100.000",
    'mileage': "200.000",
    'year': "2006",
    'ownersCount': "3",
    'gearbox': "механическая",
    'color': "белый",
    'engine': "1.5 л, 72 л.с., бензин",
    'driveShaft': "задний",
  },
  {
    'id': 7,
    'images': ["web/images/png/nissan_skyline.png"],
    'title': "Nissan Skyline",
    'price': "1.500.000",
    'mileage': "131.000",
    'year': "1998",
    'ownersCount': "2",
    'gearbox': "автоматическая",
    'color': "чёрный",
    'engine': "2.5 л, 200 л.с., бензин",
    'driveShaft': "задний",
  },
  {
    'id': 8,
    'images': ["web/images/png/audi_r8_2.jpg", "web/images/png/audi_r8_3.jpg"],
    'title': "Audi R8",
    'price': "6.000.000",
    'mileage': "10.000",
    'year': "2016",
    'ownersCount': "2",
    'gearbox': "Роботизированная",
    'color': "Серый",
    'engine': '550 л.с., 5.2 л, Бензин',
    'driveShaft': 'Полный'
  },
];

let carsData = cars;

function isCarInFavorites(carId) {
  return favoriteCars.some(car => car.id === carId);
}

function addToFavorites(carId) {
  const car = carsData.find(car => car.id === carId);
  if (car && !isCarInFavorites(carId)) {
    favoriteCars.push(car);
    updateFavoriteButtons();
    renderFavoriteCars();
    saveFavorites();
  }
}

function removeFromFavorites(carId) {
  favoriteCars = favoriteCars.filter(car => car.id !== carId);
  updateFavoriteButtons();
  renderFavoriteCars();
  saveFavorites();
}

function toggleFavorite(carId) {
  if (isCarInFavorites(carId)) {
    removeFromFavorites(carId);
  } else {
    addToFavorites(carId);
  }
}

function updateFavoriteButtons() {
  document.querySelectorAll('.car-card').forEach(card => {
    const carId = parseInt(card.dataset.carId);
    const favoriteButton = card.querySelector('.favorite__add img');
    if (favoriteButton) {
      if (isCarInFavorites(carId)) {
        favoriteButton.style.filter = 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)';
      } else {
        favoriteButton.style.filter = '';
      }
    }
  });
}

function createFavoriteCarCard(car) {
  const hasImages = car.images && car.images.length > 0;
  const imagesCount = hasImages ? car.images.length : 0;

  const formattedPrice = formatPrice(car.price);
  const formattedMileage = formatMileage(car.mileage);

  let imagesHTML = '';
  if (hasImages) {
    car.images.forEach((imgSrc, index) => {
      const activeClass = index === 0 ? 'active' : 'hidden';
      imagesHTML += `
                <img src="${imgSrc}" 
                     class="car-image ${activeClass}" 
                     alt="${car.title}"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/6c757d/ffffff?text=Нет+фото'">
            `;
    });
  } else {
    imagesHTML = '<div class="no-image">Фотографии отсутствуют</div>';
  }

  let dotsHTML = '';
  if (imagesCount > 1) {
    dotsHTML = '<div class="dots-container">';
    car.images.forEach((_, index) => {
      const activeClass = index === 0 ? 'active' : '';
      dotsHTML += `<div class="dot ${activeClass}" data-index="${index}"></div>`;
    });
    dotsHTML += '</div>';
  }

  let zonesHTML = '';
  if (imagesCount > 1) {
    zonesHTML = '<div class="hover-zones">';
    car.images.forEach((_, index) => {
      zonesHTML += `<div class="hover-zone" data-index="${index}"></div>`;
    });
    zonesHTML += '</div>';
  }

  return `
        <div class="col">
            <div class="card car-card-favorite" data-car-id="${car.id}">
                <div class="car-image-wrapper">
                    <div class="car-image-slider" data-car-id="${car.id}">
                        ${imagesHTML}
                        ${zonesHTML}
                    </div>
                    ${dotsHTML}
                </div>
                
                <div class="card-body">
                    <div class="favorite__add favorite-remove-button">
                        <img src="web/images/svg/card_favorite.svg" alt="Удалить из избранных" class="favorite-remove-icon">
                    </div>
                    <h5 class="card-title">${formattedPrice}</h5>
                    <p class="card-text car__name">${car.title}</p>
                    <p class="card-text car__year__milage">${car.year} | ${formattedMileage}</p>
                </div>
            </div>
        </div>
    `;
}

function renderFavoriteCars() {
  if (!favoritesContainer) return;

  favoritesContainer.innerHTML = '';

  if (favoriteCars.length === 0) {
    emptyFavorites.classList.remove('d-none');
    return;
  }

  emptyFavorites.classList.add('d-none');

  favoriteCars.forEach((car) => {
    favoritesContainer.innerHTML += createFavoriteCarCard(car);
  });

  initializeFavoriteSliders();
  setupFavoriteCardClickListeners();
}

function initializeFavoriteSliders() {
  const sliders = document.querySelectorAll('.car-card-favorite .car-image-slider');

  sliders.forEach(slider => {
    const images = slider.querySelectorAll('.car-image');
    const card = slider.closest('.car-card-favorite');
    const dotsContainer = card.querySelector('.dots-container');
    const hoverZones = card.querySelectorAll('.hover-zone');

    if (!dotsContainer || images.length <= 1) return;

    const dots = dotsContainer.querySelectorAll('.dot');
    let currentIndex = 0;

    function showSlide(index) {
      if (index < 0 || index >= images.length) return;

      images[currentIndex].classList.remove('active');
      images[currentIndex].classList.add('hidden');
      dots[currentIndex].classList.remove('active');

      currentIndex = index;

      images[currentIndex].classList.remove('hidden');
      images[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(index);
      });

      dot.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        showSlide(index);
      }, { passive: true });
    });

    hoverZones.forEach((zone, index) => {
      zone.addEventListener('mouseenter', () => {
        showSlide(index);
      });

      zone.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        showSlide(index);
      }, { passive: true });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          const nextIndex = (currentIndex + 1) % images.length;
          showSlide(nextIndex);
        } else {
          const prevIndex = (currentIndex - 1 + images.length) % images.length;
          showSlide(prevIndex);
        }
      }
    }
  });
}

function setupFavoriteCardClickListeners() {
  document.querySelectorAll('.car-card-favorite').forEach(card => {
    const favoriteRemoveBtn = card.querySelector('.favorite-remove-button');
    if (favoriteRemoveBtn) {
      favoriteRemoveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const carId = parseInt(card.dataset.carId);
        removeFromFavorites(carId);
      });
    }

    card.addEventListener('click', (e) => {
      if (!e.target.closest('.favorite-remove-button')) {
        const carId = card.dataset.carId;
        location.href = `car_details.html?car=${carId}`;
      }
    });
  });
}

function openFavorite() {
  renderFavoriteCars();
  modalBackgroundNode.classList.toggle(`d-none`);
  setTimeout(() => {
    favoritModalNode.classList.toggle(`is-visible`);
  }, 0);
}

function closeFavorite() {
  favoritModalNode.classList.remove(`is-visible`);
  setTimeout(() => {
    modalBackgroundNode.classList.toggle(`d-none`);
  }, 300)
}

favoriteButton.addEventListener(`click`, openFavorite);
exitButton.addEventListener(`click`, closeFavorite);

function formatPrice(price) {
  if (!price) return "0 ₽";
  return price.includes('Р') ? price : `${price} ₽`;
}

function formatMileage(mileage) {
  if (!mileage) return "0 Км";
  return mileage.includes('Км') ? mileage : `${mileage} Км`;
}

function createCarCard(car) {
  const hasImages = car.images && car.images.length > 0;
  const imagesCount = hasImages ? car.images.length : 0;

  const formattedPrice = formatPrice(car.price);
  const formattedMileage = formatMileage(car.mileage);

  let imagesHTML = '';
  if (hasImages) {
    car.images.forEach((imgSrc, index) => {
      const activeClass = index === 0 ? 'active' : 'hidden';
      imagesHTML += `
                <img src="${imgSrc}" 
                     class="car-image ${activeClass}" 
                     alt="${car.title}"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/6c757d/ffffff?text=Нет+фото'">
            `;
    });
  } else {
    imagesHTML = '<div class="no-image">Фотографии отсутствуют</div>';
  }

  let dotsHTML = '';
  if (imagesCount > 1) {
    dotsHTML = '<div class="dots-container">';
    car.images.forEach((_, index) => {
      const activeClass = index === 0 ? 'active' : '';
      dotsHTML += `<div class="dot ${activeClass}" data-index="${index}"></div>`;
    });
    dotsHTML += '</div>';
  }

  let zonesHTML = '';
  if (imagesCount > 1) {
    zonesHTML = '<div class="hover-zones">';
    car.images.forEach((_, index) => {
      zonesHTML += `<div class="hover-zone" data-index="${index}"></div>`;
    });
    zonesHTML += '</div>';
  }

  const isFavorite = isCarInFavorites(car.id);
  const favoriteStyle = isFavorite ? 'style="filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);"' : '';

  return `
        <div class="col">
            <div class="card car-card" data-car-id="${car.id}">
                <div class="car-image-wrapper">
                    <div class="car-image-slider" data-car-id="${car.id}">
                        ${imagesHTML}
                        ${zonesHTML}
                    </div>
                    ${dotsHTML}
                </div>
                
                <div class="card-body">
                    <div class="favorite__add">
                        <img src="web/images/svg/card_favorite.svg" alt="Добавить в избранные" ${favoriteStyle}>
                    </div>
                    <h5 class="card-title">${formattedPrice}</h5>
                    <p class="card-text car__name">${car.title}</p>
                    <p class="card-text car__year__milage">${car.year} | ${formattedMileage}</p>
                </div>
            </div>
        </div>
    `;
}

function renderCars(carsToRender = carsData) {
  const container = document.getElementById('cars-container');
  if (!container) return;

  const noCarsMessage = document.getElementById('no-cars-message');

  container.innerHTML = '';

  if (!carsToRender || carsToRender.length === 0) {
    if (noCarsMessage) noCarsMessage.classList.remove('d-none');
    return;
  }

  if (noCarsMessage) noCarsMessage.classList.add('d-none');

  carsToRender.forEach((car) => {
    container.innerHTML += createCarCard(car);
  });

  initializeSliders();
  setupCardClickListeners();
  setupFavoriteAddListeners();
}

function initializeSliders() {
  const sliders = document.querySelectorAll('.car-card .car-image-slider');

  sliders.forEach(slider => {
    const images = slider.querySelectorAll('.car-image');
    const card = slider.closest('.car-card');
    const dotsContainer = card.querySelector('.dots-container');
    const hoverZones = card.querySelectorAll('.hover-zone');

    if (!dotsContainer || images.length <= 1) return;

    const dots = dotsContainer.querySelectorAll('.dot');
    let currentIndex = 0;

    function showSlide(index) {
      if (index < 0 || index >= images.length) return;

      images[currentIndex].classList.remove('active');
      images[currentIndex].classList.add('hidden');
      dots[currentIndex].classList.remove('active');

      currentIndex = index;

      images[currentIndex].classList.remove('hidden');
      images[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(index);
      });

      dot.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        showSlide(index);
      }, { passive: true });
    });

    hoverZones.forEach((zone, index) => {
      zone.addEventListener('mouseenter', () => {
        showSlide(index);
      });

      zone.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        showSlide(index);
      }, { passive: true });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          const nextIndex = (currentIndex + 1) % images.length;
          showSlide(nextIndex);
        } else {
          const prevIndex = (currentIndex - 1 + images.length) % images.length;
          showSlide(prevIndex);
        }
      }
    }
  });
}

function setupCardClickListeners() {
  document.querySelectorAll('.car-card').forEach((element) => {
    element.addEventListener('click', (e) => {
      if (!e.target.closest('.favorite__add')) {
        const carId = element.dataset.carId;
        location.href = `car_details.html?car=${carId}`;
      }
    });
  });
}

function setupFavoriteAddListeners() {
  document.querySelectorAll('.favorite__add').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const carId = parseInt(button.closest('.car-card').dataset.carId);
      toggleFavorite(carId);
    });
  });
}

function setupImageErrorHandling() {
  document.addEventListener('error', function (e) {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('car-image')) {
      e.target.src = 'https://via.placeholder.com/300x200/6c757d/ffffff?text=Нет+фото';
      e.target.onerror = null;
    }
  }, true);
}

function searchCars() {
  const searchText = document.querySelector('.search-input')?.value.trim().toLowerCase();

  if (!searchText || searchText.length < 2) {
    renderCars(carsData);
    return;
  }

  const filteredCars = carsData.filter(car =>
    car.title.toLowerCase().includes(searchText)
  );

  renderCars(filteredCars);
}

function setupSearch() {
  const searchButton = document.querySelector('.search-img');
  const searchInput = document.querySelector('.search-input');

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', searchCars);

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchCars();
      }
    });

    searchInput.addEventListener('input', (e) => {
      if (e.target.value.trim() === '') {
        renderCars(carsData);
      }
    });
  }
}

function saveFavorites() {
  localStorage.setItem('favoriteCars', JSON.stringify(favoriteCars.map(car => car.id)));
}

function loadFavorites() {
  const saved = localStorage.getItem('favoriteCars');
  if (saved) {
    const favoriteIds = JSON.parse(saved);
    favoriteIds.forEach(id => {
      const car = carsData.find(c => c.id === id);
      if (car) favoriteCars.push(car);
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  loadFavorites();
  renderCars();
  setupImageErrorHandling();
  setupSearch();
});