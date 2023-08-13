import {getElement} from "../modules/helpers.js";
import mainPageEvents from "./mainPageEvents.js";
import authPageEvents from "./authPage.js";

export default function pages() {
    if (getElement('#event-portal-page')) {
        mainPageEvents()
    }
    if (getElement('#auth-page')) {
        authPageEvents();
    }


}