document.querySelector(`main`).insertAdjacentHTML("afterbegin", `
<div class="filter-modal__background d-none">
    <div class="filter-modal container">
        <div class="row row-cols-1 g-2">

            <div class="col">
                <div class="filter-modal__header">
                    <h2>Фильтры</h2>
                    <button><img src="web/images/svg/x.svg" alt="закрыть Фильтры"></button>
                </div>
            </div>

            <div class="col">
                <div class="filter-modal__body container">
                    <div class="row row-cols-1 row-cols-md-2 g-2 text-center ">
                        <div class="col">
                            <input class="filter-modal__body__input" name="mark" type="text" placeholder="Марка">
                        </div>
                        <div class="col">
                            <input class="filter-modal__body__input" name="model" type="text" placeholder="Модель">
                        </div>
                        <div class="col">
                            <input class="filter-modal__body__input" name="year_from" type="text" placeholder="Год от">
                        </div>
                        <div class="col">
                            <input class="filter-modal__body__input" name="year_to" type="text" placeholder="Год до">
                        </div>
                        <div class="col">
                            <input class="filter-modal__body__input" name="mileage_from" type="text" placeholder="Пробег от">
                        </div>
                        <div class="col">
                            <input class="filter-modal__body__input" name="mileage_to" type="text" placeholder="Пробег до">
                        </div>
                        <div class="col">
                            <input class="filter-modal__body__input" name="power_from" type="text" placeholder="Мощность от">
                        </div>
                        <div class="col">
                            <input class="filter-modal__body__input" name="power_to" type="text" placeholder="Мощность до">
                        </div>
                    </div>

                </div>
            </div>

            <div class="col">
                <button type="button" id="filterSearchButton">Найти</button>
            </div>
        </div>
    </div>
</div>`)

let filtersButton = document.querySelector(`.filter-button`);
exitButton = document.querySelector(`.filter-modal__header button`);
let filtersBackgroundNode = document.querySelector(`.filter-modal__background`);
let filtersModalNode = document.querySelector('.filter-modal');
let bodyNode = document.querySelector(`body`);
let filterSearchButton = document.querySelector(`#filterSearchButton`);

function openFilters() {
    filtersBackgroundNode.classList.remove(`d-none`);
    setTimeout(() => {
        filtersModalNode.classList.add('is-visiblef');
    }, 200);
    bodyNode.classList.add(`body__modal`);
}

function closeFilters() {
    filtersBackgroundNode.classList.add(`d-none`);
    setTimeout(() => {
        filtersModalNode.classList.remove('is-visiblef');
    }, 200);
    bodyNode.classList.remove(`body__modal`);
}

function filtredSearch() {
    let inputs = Array.from(document.querySelectorAll(`.filter-modal__body__input`))
        .map(element => ({ [element.name]: element.value }))
        .filter((element) => Object.values(element)[0].length != 0);
    
    if (inputs.length != 0) {
        let result = cars.filter(car => {
            return inputs.every(filter => {
                const key = Object.keys(filter)[0];
                const value = filter[key].toLowerCase().trim();
                
                if (key === 'mark') return car.mark.toLowerCase().includes(value);
                if (key === 'model') return car.model.toLowerCase().includes(value);
                
                if (key === 'year_from') return parseInt(car.year) >= parseInt(value);
                if (key === 'year_to') return parseInt(car.year) <= parseInt(value);
                
                if (key === 'mileage_from' || key === 'mileage_to') {
                    const carMileage = parseInt(car.mileage.toString().replace(/\./g, '').replace(/\s/g, ''));
                    const filterValue = parseInt(value);
                    if (key === 'mileage_from') return carMileage >= filterValue;
                    if (key === 'mileage_to') return carMileage <= filterValue;
                }
                
                if (key === 'power_from' || key === 'power_to') {
                    const powerMatch = car.engine.match(/(\d+)\s*л\.с\./);
                    const carPower = powerMatch ? parseInt(powerMatch[1]) : 0;
                    const filterValue = parseInt(value);
                    if (key === 'power_from') return carPower >= filterValue;
                    if (key === 'power_to') return carPower <= filterValue;
                }
                
                return true;
            });
        });
        
        renderCars(result);
        closeFilters();
    }
}

filtersButton.addEventListener(`click`, openFilters);
exitButton.addEventListener(`click`, closeFilters);
filterSearchButton.addEventListener(`click`, filtredSearch)