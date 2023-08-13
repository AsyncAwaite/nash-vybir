import {getElement, getElements, lenghtCorrect, removeActive} from "./helpers.js";
import {lang} from "./base.js";


function getLatLongFromUrl(url) {
    const regex = /@([-+]?\d+\.\d+),([-+]?\d+\.\d+)/;
    const match = url.match(regex);
    if (match) {
        const latitude = match[1];
        const longitude = match[2];

        return {latitude, longitude};
    }
    return null;
}

async function getAddressFromCoordinates(options) {
    const {language, longitude, latitude} = options
    let result = {};
    const apiKey = 'AIzaSyAAvE2wXrGOQa5s0Jl6gSLIuDg6a7luNk8'
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=country|locality&language=${language}&key=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length > 0) {
            const [code, city, country] = data.plus_code.compound_code.split(' ');
            result.country = country
            result.city = city.slice(0, -1)
            result.code = code
            result.placeId = data.results[0].place_id
            return result;
            // const addressComponents = data.results[0].address_components;
            //
            //
            // for (let component of addressComponents) {
            //     if (component.types.includes('country')) {
            //         result.country = component.long_name;
            //     }
            //     if (component.types.includes('locality')) {
            //         result.city = component.long_name;
            //     }
            // }
            // console.log(result);


        } else {
            console.log('Not found');
            return result.error = 'Not found'
        }
    } catch (error) {
        console.error('Error:', error)

    }

}

let markers = [];
const searchParams = {};

//  await createMarkers(eventsPortal)
//  await createSearchHandler()
const eventInfo = getElement('.map__info');



async function createMap(positionMap) {

    const {Map} = await google.maps.importLibrary("maps");
    return new Map(getElement('#map'), {
        center: positionMap,
        zoom: 6,
    });
}

async function createMarkers(markersDataItems, map) {
    const {Marker} = await google.maps.importLibrary("marker")
    markersDataItems.forEach((item) => {
        const {position: {lat, lng}, eventId} = item;
        if (lat && lng) {
            const pin = new Marker({
                position: {lat: +lat, lng: +lng},
                icon: assetsPath + 'assets/img/marker.svg',
                map: map,
                title: eventId.toString(),
                optimized: true
            })
            markers = [...markers, pin]
            pin.addListener("click", () => {
                markers.forEach(marker => marker.setIcon(assetsPath + 'assets/img/marker.svg'))
                pin.setIcon(assetsPath + 'assets/img/marker-active.svg');
                eventInfo.innerHTML = renderEventInfoModal(item);
                eventInfo.classList.add('active')
            });

        }

    })
}

async function createSearchHandler() {
    const searchLocationInput = getElement('.form__item_location #location-search');
    const searchLocationResponse = getElement('.place__answer');
    const clearInput = getElement('.form__item_location .icon-cross')
    const {AutocompleteService, PlacesService, Autocomplete} = await google.maps.importLibrary("places")
    const service = new AutocompleteService();
    const placesService = new PlacesService(searchLocationResponse);
    clearInput.addEventListener('click', () => {
        clearInput.classList.remove('visible')
        searchLocationResponse.classList.remove('active')
        searchLocationResponse.innerHTML = '';
        searchLocationInput.value = '';
        if (searchParams.place) searchParams.place = null;
    })
    searchLocationInput.addEventListener('input', function () {

        searchLocationResponse.innerHTML = '';
        if (searchLocationInput.value.length >= 3) {

            markers.forEach((marker) => {
                marker.setVisible(true);
            });
            searchLocationResponse.classList.add('active')
            clearInput.classList.add('visible')
            service.getPlacePredictions({
                input: searchLocationInput.value,
                types: ['(regions)'],
                componentRestrictions: {country: 'pl'}
            }, function (predictions, status) {

                if (status === 'OK') {
                    // Выводим предложения в кастомном контейнере
                    predictions.forEach(function (prediction) {

                        const customResult = document.createElement('div');
                        const region = prediction.structured_formatting.main_text;
                        customResult.classList.add('place__result');
                        customResult.textContent = region;

                        customResult.addEventListener('click', function () {
                            searchLocationInput.value = region; // Устанавливаем выбранное значение в поле ввода
                            searchLocationResponse.innerHTML = ''; // Очищаем кастомный контейнер
                            placesService.getDetails({placeId: prediction.place_id}, function (place, status) {
                                if (status === 'OK') {
                                    searchParams.place = place
                                    searchLocationResponse.classList.remove('active');

                                }
                            });
                        });
                        searchLocationResponse.appendChild(customResult);
                    });
                } else {
                    searchLocationResponse.innerHTML = `<div class="place__result">${lang == 'uk' ? 'Не знайдено' : 'Не знайдено'}</div>`
                    searchParams.place = null;
                    //Todo add pl text
                }
            });
        } else {
            searchLocationResponse.classList.remove('active')
            clearInput.classList.remove('visible')
        }
        showAllMarkers()

    });
}

async function initMap() {


    const searchLocationInput = getElement('.form__item_location #location-search');

    const searchLocationResponse = getElement('.place__answer');
    const clearInput = getElement('.form__item_location .icon-cross')
    const {AutocompleteService, PlacesService, Autocomplete} = await google.maps.importLibrary("places")
    const service = new AutocompleteService();
    const placesService = new PlacesService(searchLocationResponse);


    clearInput.addEventListener('click', () => {
        clearInput.classList.remove('visible')
        searchLocationResponse.classList.remove('active')
        searchLocationResponse.innerHTML = '';
        searchLocationInput.value = '';
        if (searchParams.place) searchParams.place = null;
    })


}

function showAllMarkers() {

    markers.forEach(marker => marker.setIcon(assetsPath + 'assets/img/marker.svg'));
    eventInfo.classList.remove('active');
}

function filterGoogleMarkers(events) {
    markers.forEach(marker => {
        if (events.find(item => item.eventId == marker.title)) {
            marker.setVisible(true)
        } else {
            marker.setVisible(false)
        }

    })
}

function renderEventInfoModal(event) {
    const {date, eventLink, title} = event;
    return ` <div class="map__content h-100 flex">
        <div class="info">
            <div class="date mb_12 txt-colo">
      ${date}
            </div>
            <div class="title f-weight_600 txt-uppercase">
            ${lenghtCorrect(title, 30)}
            </div>
        </div>
        <div class="link flex --align-center --just-center">
            <a href="${eventLink}"><span class="icon-arrow"></span></a>
        </div>
    </div>`
}


function distanceBetweenPoints(lat1, lng1, lat2, lng2) {
    const R = 6371; // Радиус Земли в километрах
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

export {
    getLatLongFromUrl,
    showAllMarkers,
    getAddressFromCoordinates,
    initMap,
    searchParams,
    distanceBetweenPoints,
    filterGoogleMarkers,
    createMap,
    createMarkers,
    createSearchHandler
}