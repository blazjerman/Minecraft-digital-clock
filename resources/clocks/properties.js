

// Day

const day_clear = {

    name: "Day clear",
    clockPath: "day/clear.png",
    backgroundPath: "day/clear.webm",
    
    width: 3840,
    height: 2160,

    startingHour: 6,

    displays: [
        {
            A:[1772,1132,1726,1155],
            B:[1788,1152,1772,1212],
            C:[1788,1232,1772,1292],
            D:[1772,1292,1726,1315],
            E:[1728,1234,1710,1292],
            F:[1726,1152,1710,1214],
            G:[1772,1212,1726,1234]
        },
        {
            A:[1680,1130,1630,1154],
            B:[1696,1152,1680,1214],
            C:[1696,1234,1679,1294],
            D:[1680,1295,1632,1319],
            E:[1632,1234,1614,1298],
            F:[1632,1152,1614,1216],
            G:[1679,1212,1632,1236]
        },
        {
            A:[1548,1130,1496,1154],
            B:[1566,1152,1548,1217],
            C:[1566,1236,1548,1302],
            D:[1548,1300,1496,1326],
            E:[1496,1238,1476,1304],
            F:[1496,1152,1476,1219],
            G:[1548,1216,1496,1238]
        },
        {
            A:[1442,1130,1386,1154],
            B:[1462,1152,1442,1219],
            C:[1461,1238,1442,1306],
            D:[1442,1304,1385,1330],
            E:[1388,1242,1366,1306],
            F:[1388,1153,1367,1220],
            G:[1442,1218,1386,1241]
        },
    ],

    dot: [1601,1193,1579,1259]
    
}

const day_cloudly = {

    name: "Day cloudly",
    clockPath: "day/cloudly.png",
    backgroundPath: "day/cloudly.webm",
    
    width: day_clear.width,
    height: day_clear.height,

    startingHour: day_clear.startingHour,

    displays: day_clear.displays,
    dot: day_clear.dot
    
}

const day_rain = {

    name: "Day rain",
    clockPath: "day/rain.png",
    backgroundPath: "day/rain.webm",
    
    width: day_clear.width,
    height: day_clear.height,

    startingHour: day_clear.startingHour,

    displays: day_clear.displays,
    dot: day_clear.dot,

    imgStyle: "mix-blend-mode: lighten;"
}

const day_snow = {

    name: "Day snow",
    clockPath: "day/snow.png",
    backgroundPath: "day/snow.webm",
    
    width: day_clear.width,
    height: day_clear.height,

    startingHour: day_clear.startingHour,

    displays: day_clear.displays,
    dot: day_clear.dot,

    imgStyle: "mix-blend-mode: lighten;"
    
}



// Midnight

const midnight_clear = {

    name: "Midnight clear",
    clockPath: "midnight/clear.png",
    backgroundPath: "midnight/clear.webm",
    
    width: day_clear.width,
    height: day_clear.height,

    startingHour: 23,

    displays: day_clear.displays,
    dot: day_clear.dot
    
}

const midnight_cloudly = {

    name: "Midnight cloudly",
    clockPath: "midnight/cloudly.png",
    backgroundPath: "midnight/cloudly.webm",
    
    width: day_clear.width,
    height: day_clear.height,

    startingHour: 20,

    displays: day_clear.displays,
    dot: day_clear.dot
    
}

const midnight_rain = {

    name: "Midnight rain",
    clockPath: "midnight/rain.png",
    backgroundPath: "midnight/rain.webm",
    
    width: day_clear.width,
    height: day_clear.height,

    startingHour: 20,

    displays: day_clear.displays,
    dot: day_clear.dot,

    imgStyle: "mix-blend-mode: lighten;"
    
}



const midnight_snow = {

    name: "Midnight snow",
    clockPath: "midnight/snow.png",
    backgroundPath: "midnight/snow.webm",
    
    width: day_clear.width,
    height: day_clear.height,

    startingHour: 20,

    displays: day_clear.displays,
    dot: day_clear.dot,

    imgStyle: "mix-blend-mode: lighten;"
    
}


// Night


const night_clear = {

    name: "Night clear",
    clockPath: "night/clear.png",
    backgroundPath: "night/clear.webm",
    
    width: day_clear.width,
    height: day_clear.height,

    startingHour: 20,

    displays: day_clear.displays,
    dot: day_clear.dot
    
}

// Noon

const noon_clear = {

    name: "Noon clear",
    clockPath: "noon/clear.png",
    backgroundPath: "noon/clear.webm",
    
    width: day_clear.width,
    height: day_clear.height,

    startingHour: 11,

    displays: day_clear.displays,
    dot: day_clear.dot
    
}



const clocks = [

    {
        weather: ["Clear"],
        types: [day_clear, midnight_clear, night_clear, noon_clear]
    },
    {
        weather: ["Clouds", "Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Dust", "Ash", "Squall", "Tornado"],
        types: [day_cloudly, midnight_cloudly,]
    },
    {
        weather: ["Rain", "Thunderstorm", "Drizzle"],
        types: [day_rain, midnight_rain]
    },
    {
        weather: ["Snow"],
        types: [day_snow, midnight_snow]
    }

]
