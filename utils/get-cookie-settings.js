const {getAddonsFromReq} = require("./get-addons-from-req");
const {handlebarsHelpers} = require("./handlebars-helpers");
const {COOKIE_BASES, COOKIE_ADDONS} = require("../data/cookie-data");

function getCookieSettings(req) {
    const {cookieBase: base} = req.cookies;

    const addons = getAddonsFromReq(req);

    const allBases = Object.entries(COOKIE_BASES);
    const allAddons = Object.entries(COOKIE_ADDONS);

    const sum = (base? handlebarsHelpers.findPrice(allBases, base) : 0) + addons.reduce((prev, curr) => (
        prev + handlebarsHelpers.findPrice(allAddons, curr)
    ), 0);

    return {
        // Selected Stuff
        addons,
        base,

        //calculations
        sum,

        //all possibilities
        allBases,
        allAddons,
    }
}

module.exports = {
    getCookieSettings
}