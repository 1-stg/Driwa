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

function formatPrice(price) {
  if (!price) return "0 Р";
  return price.includes('Р') ? price : `${price} Р`;
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

  const currentYear = new Date().getFullYear();
  const carYear = parseInt(car.year);
  const isNewCar = !isNaN(carYear) && (currentYear - carYear) <= 3;
  // const newBadgeHTML = isNewCar ? '<div class="new-badge">НОВИНКА</div>' : '';

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
                    <div class"favorite-card-button"></div>
                    <h5 class="card-title">${formattedPrice}</h5>
                    <p class="card-text car__name">${car.title}</p>
                    <p class="card-text car__year__milage">${car.year} | ${formattedMileage}</p>
                    <div class="favorite__add">
                      <img src="web/images/svg/favorite.svg" alt="Добавить в избранные">
                    </div>
                </div>
                
            </div>
        </div>
    `;
}

function renderCars() {
  const container = document.getElementById('cars-container');
  if (!container) return;

  const noCarsMessage = document.getElementById('no-cars-message');

  container.innerHTML = '';

  if (!carsData || carsData.length === 0) {
    if (noCarsMessage) noCarsMessage.classList.remove('d-none');
    return;
  }

  if (noCarsMessage) noCarsMessage.classList.add('d-none');

  carsData.forEach((car, index) => {
    if (!car.id) car.id = index + 1;
    container.innerHTML += createCarCard(car);
  });

  initializeSliders();
}

function initializeSliders() {
  const sliders = document.querySelectorAll('.car-image-slider');

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

function setupImageErrorHandling() {
  document.addEventListener('error', function (e) {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('car-image')) {
      e.target.src = 'https://via.placeholder.com/300x200/6c757d/ffffff?text=Нет+фото';
      e.target.onerror = null;
    }
  }, true);
}

document.addEventListener('DOMContentLoaded', function () {
  renderCars();
  setupImageErrorHandling();

  let links = document.querySelectorAll(`.car-card`)
  links.forEach((element) => {
    element.addEventListener(`click`, () => {
      location.href = `http://127.0.0.1:5500/car_details.html?car=${element.dataset.carId}`
    });
  })
});

