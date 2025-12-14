const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('car') ? parseInt(urlParams.get('car')) - 1 : 0;
const carData = cars[carId];

let titleNode = document.querySelector('title');
titleNode.innerHTML += ` - ${carData['title']}`;

const carHtml = document.querySelector('.car-details');
const hasMultipleImages = carData['images'].length > 1;

carHtml.innerHTML = `
    <div class="photos-title">
        <div class="car-details-photos-container">
            <div class="main-img-container">
                ${carData['images'].map((img, index) => `
                    <img class="main-img ${index === 0 ? 'active' : ''}" 
                         src="${img || 'web/images/svg/base_photo.svg'}" 
                         alt="${carData['title']} - фото ${index + 1}"
                         loading="${index === 0 ? 'eager' : 'lazy'}">
                `).join('')}
            </div>
            
            ${hasMultipleImages ? `
                <div class="slider-nav">
                    <button class="slider-prev" aria-label="Предыдущее фото">‹</button>
                    <button class="slider-next" aria-label="Следующее фото">›</button>
                </div>
                
                <div class="slider-indicators">
                    ${carData['images'].map((_, index) => `
                        <div class="slider-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                    `).join('')}
                </div>
            ` : ''}
        </div>

        ${hasMultipleImages ? `
            <div class="car-details-photos-sub-container">
                ${carData['images'].slice(0, 3).map((img, index) => `
                    <div class="sub-img-container ${index === 0 ? 'active' : ''}" data-index="${index}">
                        <img class="sub-img" 
                             src="${img || carData['images'][0] || 'web/images/svg/base_photo.svg'}" 
                             alt="${carData['title']} - миниатюра ${index + 1}"
                             loading="lazy">
                    </div>
                `).join('')}
                
                ${carData['images'].length > 3 ? `
                    <div class="sub-img-container more-images" data-index="3">
                        <div class="sub-img more-overlay">
                            <span>+${carData['images'].length - 3}</span>
                            <p>Ещё фото</p>
                        </div>
                    </div>
                ` : ''}
            </div>
        ` : ''}
        
        <div class="title-price">
            <div class="title">
                <h1>${carData['title']}, ${carData['year']}</h1>
            </div>
            <div class="price">
                <h2>${carData['price']}₽</h2>
            </div>
        </div>
    </div>

    <div class="options-button-container">
        <button id="buttomNewMessage" class="car-details-button" type="button">Написать</button>
        <div class="container options__container">
            <div class="row gx-3 row-cols-1 row-cols-lg-3 row-cols-xxl-2 text-center">
                <!-- Пробег -->
                <div class="col mb-3">
                    <div class="options-car-details-item text-center">
                        <img src="web/images/svg/mileage.svg" alt="Пробег" />
                        <p class="options-car-details-item-main">Пробег</p>
                        <p class="options-car-details-item-sub">${carData['mileage']} Км</p>
                    </div>
                </div>
                
                <!-- Коробка передач -->
                <div class="col mb-3">
                    <div class="options-car-details-item text-center">
                        <img src="web/images/svg/gearbox.svg" alt="Коробка передач" />
                        <p class="options-car-details-item-main">Коробка</p>
                        <p class="options-car-details-item-sub">${carData['gearbox']}</p>
                    </div>
                </div>
                
                <!-- Цвет -->
                <div class="col mb-3">
                    <div class="options-car-details-item text-center">
                        <img src="web/images/svg/spray_gun.svg" alt="Цвет" />
                        <p class="options-car-details-item-main">Цвет</p>
                        <p class="options-car-details-item-sub">${carData['color']}</p>
                    </div>
                </div>
                
                <!-- Год выпуска -->
                <div class="col mb-3">
                    <div class="options-car-details-item text-center">
                        <img src="web/images/svg/celendar.svg" alt="Дата выхода" />
                        <p class="options-car-details-item-main">Год выпуска</p>
                        <p class="options-car-details-item-sub">${carData['year']}</p>
                    </div>
                </div>
                
                <!-- Двигатель -->
                <div class="col mb-3">
                    <div class="options-car-details-item text-center">
                        <img src="web/images/svg/engine.svg" alt="Двигатель" />
                        <p class="options-car-details-item-main">Двигатель</p>
                        <p class="options-car-details-item-sub">${carData['engine']}</p>
                    </div>
                </div>
                
                <!-- Привод -->
                <div class="col mb-3">
                    <div class="options-car-details-item text-center">
                        <img src="web/images/svg/drive_shaft.svg" alt="Привод" />
                        <p class="options-car-details-item-main">Привод</p>
                        <p class="options-car-details-item-sub">${carData['driveShaft']}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

function initSlider() {
    const mainImages = document.querySelectorAll('.main-img');
    const indicators = document.querySelectorAll('.slider-indicator');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const thumbnails = document.querySelectorAll('.sub-img-container:not(.more-images)');
    const moreImagesBtn = document.querySelector('.more-images');

    const totalImages = mainImages.length;
    const hasMultipleImages = totalImages > 1;

    if (!hasMultipleImages) {
        if (mainImages.length > 0) {
            mainImages[0].style.display = 'block';
        }
        return;
    }

    let currentIndex = 0;

    function updateSlider(index) {
        mainImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
            img.style.display = i === index ? 'block' : 'none';
        });

        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        if (thumbnails.length > 0) {
            thumbnails.forEach((thumb, i) => {
                if (i < 3) {
                    thumb.classList.toggle('active', i === index);
                }
            });
        }

        if (prevBtn && nextBtn) {
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === totalImages - 1;
        }

        mainImages[index].classList.add('fade-in');
        setTimeout(() => {
            mainImages[index].classList.remove('fade-in');
        }, 500);

        currentIndex = index;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                updateSlider(currentIndex - 1);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalImages - 1) {
                updateSlider(currentIndex + 1);
            }
        });
    }

    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                updateSlider(index);
            });
        });
    }

    if (thumbnails.length > 0) {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                updateSlider(index);
            });
        });
    }

    if (moreImagesBtn) {
        moreImagesBtn.addEventListener('click', () => {
            updateSlider(3);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (hasMultipleImages && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                updateSlider(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < totalImages - 1) {
                updateSlider(currentIndex + 1);
            }
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    const sliderContainer = document.querySelector('.car-details-photos-container');

    if (sliderContainer && hasMultipleImages) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        if (!hasMultipleImages) return;

        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < totalImages - 1) {
                updateSlider(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                updateSlider(currentIndex - 1);
            }
        }
    }

    updateSlider(0);
}

document.addEventListener('DOMContentLoaded', initSlider);

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function () {
        this.classList.remove('image-loading');
    });

    img.addEventListener('error', function () {
        this.src = 'web/images/svg/base_photo.svg';
        this.classList.remove('image-loading');
    });

    if (!img.complete) {
        img.classList.add('image-loading');
    }
});

const newMessageButton = document.querySelector(`#buttomNewMessage`);
if (newMessageButton) {
    newMessageButton.addEventListener(`click`, chat);
}