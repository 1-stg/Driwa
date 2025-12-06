const cars = [
  {
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
    'images': ["web/images/png/bmw_m4.png", "web/images/png/bmw_m4_2.jpg"],
    'title': "Bmw M4",
    'price': "4.000.000",
    'mileage': "50.000",
    'year': "2018",
    'ownersCount': 2,
    'gearbox': "роботизированная",
    'color': 'white',
    'engine': '3.0 л, 450 л.с., бензин',
    'driveShaft': 'задний',
  },
  {
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

const createCarousels = (car, index) => {
  const imageCount = car.images?.length || 0;
  const carId = index + 1;

  if (imageCount <= 1) {
    const imageSrc = imageCount === 1 ? car.images[0] : "web/images/svg/base_photo.svg";
    return `
      <img src="${imageSrc}" class="d-block w-100" alt="${car.title}">
    `;
  }

  const indicators = Array.from({ length: imageCount }, (_, i) =>
    `<button type="button" data-bs-target="#carCarousel-${carId}" data-bs-slide-to="${i}" 
            class="${i === 0 ? 'active' : ''}" aria-current="${i === 0 ? 'true' : 'false'}" 
            aria-label="Slide ${i + 1}"></button>`
  ).join('');

  const carouselItems = Array.from({ length: imageCount }, (_, i) =>
    `<div class="carousel-item ${i === 0 ? 'active' : ''}">
      <img src="${car.images[i]}" class="d-block w-100" alt="${car.title}">
    </div>`
  ).join('');

  return `
    <div id="carCarousel-${carId}" class="carousel slide" data-bs-ride="false" data-bs-interval="false">
      <div class="carousel-indicators">${indicators}</div>
      <div class="carousel-inner">${carouselItems}</div>
    </div>
  `;
};

const createCarCards = (car, index) => {
  return `
    <div class="car-cart">
      <a href="car_details.html?car=${index + 1}">
        <div class="car-cart-img-container">
          ${createCarousels(car, index)}
        </div>
        <div class="car-cart-text">
          <h2>${car.title}</h2>
          <p class="car-cart-price">${car.price} ₽</p>
          <p class="car-cart-mileage">${car.mileage} Км</p>
        </div>
      </a>
    </div>
  `;
};

const renderCars = (carsArray, container, times) => {
  let html = '';

  for (let i = 0; i < times; i++) {
    html += carsArray.map((car, index) => createCarCards(car, index)).join('');
  }

  container.innerHTML = html;
};


const carCartsContainer = document.querySelector('.car-cart-container');
if (carCartsContainer) {
  renderCars(cars, carCartsContainer, 2);
}