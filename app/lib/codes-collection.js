const LOCALSTORAGE_KEY = "codes";
function getCollection () {
    return JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY) || "{}"
    );
}
function setCollection (db) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(db));
}

export function get () {
    return getCollection();
}

export function insert ({code, url}) {
    setCollection({
        ...getCollection(),
        [code]: {code, url}
    });
}

export function drop () {
    setCollection({});
}
