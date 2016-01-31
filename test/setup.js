import "babel-polyfill";
import {jsdom} from "jsdom";
import MockStorage from "mock-localstorage";

// Setup fake DOM
global.document = jsdom();
global.window = document.defaultView;
global.window.APP_CONFIG = {
    API_URL: "API_URL"
};
global.navigator = {
    userAgent: "node.js"
};

// Setup fake localStorage
global.localStorage = new MockStorage();
