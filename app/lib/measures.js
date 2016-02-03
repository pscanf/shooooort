import {fromPairs, map, pipe, toPairs} from "ramda";

const px = ([key, value]) => [`${key}Px`, `${value}px`];
const convert = pipe(toPairs, map(px), fromPairs);

const measures = {
    borderRadius: 3
};

export default {
    ...measures,
    ...convert(measures)
};
