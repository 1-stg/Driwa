carId = location.href[location.href.indexOf('car=') + 4] - 1;
carData = cars[carId];
let titleNode = document.querySelector(`title`);
titleNode.innerHTML += ` - ${carData['title']}`;


carHtml = document.querySelector(`.car-details`);

carHtml.innerHTML = `
        <div class="photos-title">
          <div class="car-details-photos-container">
            <div class="main-img-container">
              <img class="main-img" src="${carData['images'][0] ?? "web/images/svg/base_photo.svg"}" alt="${carData['title']}">
            </div>
            <div class="car-details-photos-sub-container">
              <div class="sub-img-container">
                <img class="sub-img" src="${carData['images'][1] ?? carData['images'][0] ?? "web/images/svg/base_photo.svg"}" alt="${carData['title']}">
              </div>
              <div class="sub-img-container">
                <img class="sub-img" src="${carData['images'][2] ?? carData['images'][0] ?? "web/images/svg/base_photo.svg"}" alt="${carData['title']}}" alt="${carData['title']}">
              </div>
              <div class="sub-img-container">
                <img class="sub-img" src="${carData['images'][3] ?? carData['images'][0] ?? "web/images/svg/base_photo.svg"}" alt="${carData['title']}}" alt="${carData['title']}">
              </div>
            </div>
          </div>
          
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
          <div class="options-car-details">
            <h2>Характеристики</h2>

            <div class="options-car-details-item">
              <img src="web/images/svg/mileage.svg" alt="Пробег" />
              <p class="options-car-details-item-main">Пробег</p>
              <p class="options-car-details-item-sub">${carData['mileage']} Км</p>
            </div>

            <div class="options-car-details-item">
              <img src="web/images/svg/gearbox.svg" alt="Коробка передач" />
              <p class="options-car-details-item-main">Коробка</p>
              <p class="options-car-details-item-sub">${carData['gearbox']}</p>
            </div>

            <div class="options-car-details-item">
              <img src="web/images/svg/spray_gun.svg" alt="Цвет" />
              <p class="options-car-details-item-main">Цвет</p>
              <p class="options-car-details-item-sub">${carData['color']}</p>
            </div>

            <div class="options-car-details-item">
              <img src="web/images/svg/celendar.svg" alt="Дата выхода" />
              <p class="options-car-details-item-main">Год выпуска</p>
              <p class="options-car-details-item-sub">${carData['year']}</p>
            </div>

            <div class="options-car-details-item">
              <img src="web/images/svg/engine.svg" alt="Двигатель" />
              <p class="options-car-details-item-main">Двигатель</p>
              <p class="options-car-details-item-sub">${carData['engine']}</p>
            </div>

            <div class="options-car-details-item">
              <img src="web/images/svg/drive_shaft.svg" alt="Привод" />
              <p class="options-car-details-item-main">Привод</p>
              <p class="options-car-details-item-sub">${carData['driveShaft']}</p>
            </div>
          </div>

          <div class="button-container">
            <button class="car-details-button" type="button">Написать</button>
          </div>
        </div>`;