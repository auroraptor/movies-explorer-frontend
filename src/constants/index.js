const MOBILE_MAX_WIDTH = 520;
const DESKTOP_MIN_WIDTH = 980;

export const displayItemsPerPage = (width) => width > DESKTOP_MIN_WIDTH ? 12 : width > MOBILE_MAX_WIDTH ? 8 : 5;

export const displayNextItems = (width) => width > DESKTOP_MIN_WIDTH ? 3 : 2;