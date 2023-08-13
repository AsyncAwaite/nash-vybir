import {parseDateFromString} from "./helpers.js";
import {distanceBetweenPoints, searchParams} from "./googleMap.js";

function filterByTitle(inputText, eventsArray) {
    const searchText = inputText.toLowerCase().trim();
    return eventsArray.filter((event) => {
        const title = event.title.toLowerCase();
        return title.includes(searchText);
    });
}

function filterByPrice(value, eventsArray) {
    return eventsArray.filter(({price}) => price === value);
}

function filterByDate1(value, eventsArray) {
    const dates = value.split(' - ');

    return eventsArray.filter(({date_value_start, date_value_end}) => {
        const startDate = date_value_start ? parseDateFromString(date_value_start) : null;
        const endDate = parseDateFromString(date_value_end);

        if (dates.length > 1) {
            const [startRange, endRange] = dates;
            const startValue = parseDateFromString(startRange);
            const endValue = parseDateFromString(endRange);

            if (startDate) {
                return (
                    (startValue <= startDate && startDate <= endValue) ||
                    (startValue <= endDate && endDate <= endValue)
                );
            } else {
                return endDate >= startValue && endDate <= endValue;
            }
        } else {
            const date = parseDateFromString(dates[0]);

            if (startDate) {
                return startDate <= date && date <= endDate;
            } else {
                return endDate.getTime() === date.getTime();
            }
        }
    });
}

function filterByDate(value, eventsArray) {
    const dates = value.split(' - ');
    if (dates.length > 1) {
        let [startRange, endRange] = dates;
        let startValue = parseDateFromString(startRange).getTime()
        let endValue = parseDateFromString(endRange).getTime()
        return eventsArray.filter(({date_value_end, date_value_start}) => {
            let startDate = null;
            const endDate = parseDateFromString(date_value_end).getTime();
            if (date_value_start) {
                startDate = parseDateFromString(date_value_start).getTime();
            }
            if (startDate) {
                let start = startValue >= startDate && startValue <= endDate
               let end = endValue >= startDate && endValue <= endDate
               return start || end
            } else {
                return endDate >= startValue && endDate <= endValue
           }
        })
    } else {
        let [oneDate] = dates;
        const date = parseDateFromString(oneDate).getTime();
        return eventsArray.filter(({date_value_end, date_value_start}) => {
            let startDate = null;
            const endDate = parseDateFromString(date_value_end).getTime();
            if (date_value_start) {
                startDate = parseDateFromString(date_value_start).getTime();
            }
            if (startDate) {
                return startDate <= date && endDate >= date
            } else {
                return endDate == date
            }
        })
    }
}


function filterMarkersByCity(place, eventsArray) {
    return eventsArray.filter(({placeId}) => placeId === place.place_id);
}


function filterMarkersByAndRadius(place, eventsArray) {
    const selectedCityCoords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
    };
    return eventsArray.filter(marker => {
        const markerCoords = marker.position;
        const distance = distanceBetweenPoints(
            selectedCityCoords.lat, selectedCityCoords.lng,
            markerCoords.lat, markerCoords.lng
        );
        if (marker.placeId == place.place_id || distance <= searchParams.radius) return marker;
    })
}

export {filterByTitle, filterByPrice, filterByDate, filterMarkersByCity, filterMarkersByAndRadius}