const carCartsAddHtml = (carCartsContainer) => {
    cars.forEach((element, index) => {
        carCartsContainer.innerHTML += `<div class="car-cart">
        <a href = "car_details.html?car=${index + 1}">
          <div class="car-cart-img">
            <img src="${element['image']}" alt="${element['title']}" />
          </div>
          <div class="car-cart-text">
            <h2>${element['title']}</h2>
            <p class="car-cart-price">${element['price']} ₽</p>
            <p class="car-cart-mileage">${element['mileage']} Км</p>
          </div>
        </a>
      </div>`
    });
}

const cars = [
    {
        'image': "web/images/png/audi_r8.png",
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
        'image': "web/images/png/bmw_m4.png",
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
        'image': "web/images/png/toyota_rav4.png",
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
        'image': "web/images/png/mclaren_720s.png",
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
        'image': "web/images/png/porsche_panamera.png",
        'title': "Porsche Panamera",
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
        'image': "web/images/png/vaz_2107.png",
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
        'image': "web/images/png/nissan_skyline.png",
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
]

let carCartsContainer = document.querySelector(`.car-cart-container`);
// while (i < 5) {

// }
carCartsAddHtml(carCartsContainer);
carCartsAddHtml(carCartsContainer);
carCartsAddHtml(carCartsContainer);
carCartsAddHtml(carCartsContainer);

