let searchButton = document.querySelector('.search-img');

function search() {
    let searchText = document.querySelector('.search-input').value.trim().toLowerCase();
    let result = [];

    if (searchText === '') {
        result = cars.map((_, index) => index);
    } else {
        if (searchText.length >= 2) {
            cars.forEach((car, index) => {
                if (car.title.toLowerCase().includes(searchText) && !result.includes(index)) {
                    result.push(index);
                }
            });
        }
    }

    displaySearchResults(result);
}

function displaySearchResults(result) {
    let carCartsContainer = document.querySelector('.car-cart-container');

    if (result.length === 0) {
        carCartsContainer.innerHTML = '<p class="no-results">Ничего не найдено</p>';
        return;
    }

    carCartsContainer.innerHTML = result.map(index => createCarCard(cars[index], index)).join('');
}

function createCarCard(car, index) {
    const carId = index + 1;
    const hasImages = car.images && car.images.length > 0;
    const imageCount = hasImages ? car.images.length : 0;

    return `
        <div class="car-cart">
            <a href="car_details.html?car=${carId}">
                <div class="car-cart-img-container">
                    ${createCarousel(car, carId, imageCount)}
                </div>
                <div class="car-cart-text">
                    <h2>${car.title}</h2>
                    <p class="car-cart-price">${car.price} ₽</p>
                    <p class="car-cart-mileage">${car.mileage} Км</p>
                </div>
            </a>
        </div>
    `;
}

function createCarousel(car, carId, imageCount) {
    if (imageCount >= 3) {
        return createMultiImageCarousel(car, carId, 3);
    } else if (imageCount === 2) {
        return createMultiImageCarousel(car, carId, 2);
    } else if (imageCount === 1) {
        return `<img src="${car.images[0]}" class="d-block w-100" alt="${car.title}">`;
    } else {
        return `<img src="web/images/svg/base_photo.svg" class="d-block w-100" alt="${car.title}">`;
    }
}

function createMultiImageCarousel(car, carId, count) {
    const indicators = Array.from({ length: count }, (_, i) =>
        `<button type="button" data-bs-target="#carCarousel-${carId}" data-bs-slide-to="${i}" 
                class="${i === 0 ? 'active' : ''}" aria-label="Slide ${i + 1}"></button>`
    ).join('');

    const carouselItems = Array.from({ length: count }, (_, i) =>
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
}

searchButton.addEventListener('click', search);

document.addEventListener('DOMContentLoaded', function () {
    search();
});