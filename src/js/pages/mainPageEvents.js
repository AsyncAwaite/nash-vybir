import {getElement} from "../modules/helpers.js";
import Form from "../modules/Form.js";
import {
    createMap,
    createMarkers,
    createSearchHandler,
    getAddressFromCoordinates, searchParams,
    showAllMarkers
} from "../modules/googleMap.js";
import {filterMarkersByCity} from "../modules/filterFunctions.js";

const eventsContainer = getElement('[data-events-container]');
let map = null;
const dateResult = getElement('[data-result-dateLabel]');
const cityResult = getElement('[data-result-city]');
export default async function mainPageEvents() {
    let positionMap = {lat: 52.229676, lng: 21.012229};
    // initMap();
    if (getElement('.form-search-event')) {

        const form = new Form('.form-search-event').create();
        map = await createMap(positionMap);
        await createMarkers(eventsPortal, map);
        await createSearchHandler();
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async function (position) {
                    positionMap.lat = position.coords.latitude;
                    positionMap.lng = position.coords.longitude;
                    const city = await getAddressFromCoordinates({
                        language: 'uk', longitude: positionMap.lng, latitude: positionMap.lat
                    });
                    city.place_id = city.placeId;
                    let filteredEvents = filterMarkersByCity(city, eventsPortal);
                    if (filteredEvents.length) {
                        eventsContainer.innerHTML = renderFilteredEvents(filteredEvents);
                        map.setCenter(positionMap);
                        map.setZoom(11);
                        searchParams.place = city;
                        cityResult.innerHTML = city.city
                    }
                }
            );
        }


        form.searchEvents(map)
        map.addListener("click", () => {
            showAllMarkers()
        });

    }
    // renderFilteredEvents(eventsPortal)
}


function renderFilteredEvents(events) {
    let fragment = '';
    events.forEach(event => {
        const {eventLink, title, img, date_start, date_end} = event;
        const date = date_start ? `${date_start} - ${date_end}` : `${date_end}`;
        fragment += `<a href="${eventLink}" class="event">
                <div class="image">
                  ${img}
                    <div class="event__top active">
                        <span class="icon-fire"></span>
                        <div>топ подія</div>
                    </div>
                </div>
                <div class="event__date">
             ${date}
                </div>
                <div class="event__title">
                  ${title}
                    <span class="icon-fire-big"></span>
                </div>
            </a>`
    })
    return fragment;
}


export {renderFilteredEvents, eventsContainer, map, dateResult, cityResult};